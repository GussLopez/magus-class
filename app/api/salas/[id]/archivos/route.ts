import { createClient } from "../../../../../src/shared/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { data: archivos, error } = await supabase
      .from("documents")
      .select("id, title, file_name, file_url, file_type, status, created_at, user_id, profiles(name, last_name)")
      .eq("room_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const resultado = (archivos ?? []).map((a: any) => ({
      id: a.id,
      titulo: a.title,
      nombreArchivo: a.file_name,
      url: a.file_url,
      tipo: a.file_type,
      estado: a.status,
      creadoEn: a.created_at,
      subidoPor: a.profiles
        ? `${a.profiles.name} ${a.profiles.last_name ?? ""}`.trim()
        : "Estudiante",
    }));

    return NextResponse.json(resultado);
  } catch (err: any) {
    console.error("ERROR LISTAR ARCHIVOS:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { data: perfil, error: errorPerfil } = await supabase
      .from("profiles")
      .select("tenant_id")
      .eq("id", user.id)
      .single();

    if (errorPerfil || !perfil) {
      return NextResponse.json({ error: "No se pudo obtener el perfil" }, { status: 500 });
    }

    const formData = await req.formData();
    const archivo = formData.get("archivo") as File;

    if (!archivo) {
      return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
    }

    const rutaArchivo = `${id}/${Date.now()}-${archivo.name}`;

    const { error: errorSubida } = await supabase.storage
      .from("archivos-salas")
      .upload(rutaArchivo, archivo);

    if (errorSubida) {
      return NextResponse.json({ error: errorSubida.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("archivos-salas").getPublicUrl(rutaArchivo);

    const { data: registro, error: errorDb } = await supabase
      .from("documents")
      .insert({
        title: archivo.name,
        file_name: archivo.name,
        file_url: publicUrl,
        file_type: archivo.type,
        status: "ready",
        room_id: id,
        user_id: user.id,
        tenant_id: perfil.tenant_id,
      })
      .select()
      .single();

    if (errorDb) {
      return NextResponse.json({ error: errorDb.message }, { status: 500 });
    }

    return NextResponse.json(registro);
  } catch (err: any) {
    console.error("ERROR SUBIR ARCHIVO:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}