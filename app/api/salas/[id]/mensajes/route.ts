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

    const { data: mensajes, error } = await supabase
      .from("room_messages")
      .select("id, content, created_at, user_id, profiles(id, name, last_name, avatar_url)")
      .eq("room_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const resultado = (mensajes ?? []).map((m: any) => ({
      id: m.id,
      contenido: m.content,
      creadoEn: m.created_at,
      usuarioId: m.user_id,
      usuarioNombre: m.profiles
        ? `${m.profiles.name} ${m.profiles.last_name ?? ""}`.trim()
        : "Estudiante",
      usuarioAvatar: m.profiles?.avatar_url ?? null,
    }));

    return NextResponse.json(resultado);
  } catch (err: any) {
    console.error("ERROR LISTAR MENSAJES:", err);
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

    const { contenido } = await req.json();

    if (!contenido?.trim()) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    const { data: mensaje, error } = await supabase
      .from("room_messages")
      .insert({ room_id: id, user_id: user.id, content: contenido })
      .select("id, content, created_at, user_id, profiles(id, name, last_name, avatar_url)")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      id: mensaje.id,
      contenido: mensaje.content,
      creadoEn: mensaje.created_at,
      usuarioId: mensaje.user_id,
      usuarioNombre: mensaje.profiles
        ? `${(mensaje.profiles as any).name} ${(mensaje.profiles as any).last_name ?? ""}`.trim()
        : "Estudiante",
      usuarioAvatar: (mensaje.profiles as any)?.avatar_url ?? null,
    });
  } catch (err: any) {
    console.error("ERROR ENVIAR MENSAJE:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}