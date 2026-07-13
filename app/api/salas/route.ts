import { createClient } from "../../../src/shared/lib/supabase/server";
import { NextResponse } from "next/server";

function generarCodigo() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    console.log("========== CREAR SALA ==========");

    const supabase = await createClient();

    console.log("Cliente Supabase creado");

    const {
      data: { user },
      error: errorUser,
    } = await supabase.auth.getUser();

    console.log("Usuario autenticado:", user);
    console.log("Error usuario:", errorUser);

    if (!user) {
      console.log("No hay usuario autenticado");
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    console.log("User ID:", user.id);
    console.log("Email:", user.email);

    const { data: perfil, error: errorPerfil } = await supabase
      .from("profiles")
      .select("tenant_id")
      .eq("id", user.id)
      .single();

    console.log("Perfil:", perfil);
    console.log("Error perfil:", errorPerfil);

    if (errorPerfil || !perfil) {
      return NextResponse.json(
        { error: "No se pudo obtener el perfil del usuario" },
        { status: 500 }
      );
    }

    console.log("Tenant ID:", perfil.tenant_id);

    const body = await req.json();

    console.log("Body recibido:", body);

    const { nombre } = body;

    if (!nombre?.trim()) {
      console.log("Nombre vacío");
      return NextResponse.json(
        { error: "Nombre requerido" },
        { status: 400 }
      );
    }

    let codigo = generarCodigo();
    let existe = true;

    while (existe) {
      const { data } = await supabase
        .from("study_rooms")
        .select("id")
        .eq("code", codigo)
        .maybeSingle();

      if (!data) {
        existe = false;
      } else {
        codigo = generarCodigo();
      }
    }

    console.log("Código generado:", codigo);

    const datosInsert = {
      name: nombre,
      code: codigo,
      created_by: user.id,
      tenant_id: perfil.tenant_id,
    };

    console.log("Datos a insertar:");
    console.log(JSON.stringify(datosInsert, null, 2));

    const { data: sala, error: errorSala } = await supabase
      .from("study_rooms")
      .insert(datosInsert)
      .select()
      .single();

    console.log("Resultado INSERT:");
    console.log("Sala:", sala);
    console.log("Error:", errorSala);

    if (errorSala) {
      console.error("ERROR INSERT STUDY_ROOM:", errorSala);

      return NextResponse.json(
        {
          error: errorSala.message,
          details: errorSala.details,
          hint: errorSala.hint,
          code: errorSala.code,
        },
        { status: 500 }
      );
    }

    console.log("Insert correcto");

    const miembro = {
      room_id: sala.id,
      user_id: user.id,
      role: "owner",
    };

    console.log("Insertando miembro:");
    console.log(miembro);

    const { error: errorMiembro } = await supabase
      .from("room_members")
      .insert(miembro);

    console.log("Error miembro:", errorMiembro);

    if (errorMiembro) {
      console.error("ERROR INSERT ROOM_MEMBER:", errorMiembro);

      return NextResponse.json(
        {
          error: errorMiembro.message,
          details: errorMiembro.details,
          hint: errorMiembro.hint,
          code: errorMiembro.code,
        },
        { status: 500 }
      );
    }

    console.log("Sala creada correctamente");
    console.log("==============================");

    return NextResponse.json({
      id: sala.id,
      nombre: sala.name,
      codigo: sala.code,
      participantes: 1,
    });
  } catch (err: any) {
    console.error("ERROR GENERAL:");
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Usuario GET:", user);

    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { data: miembros, error } = await supabase
      .from("room_members")
      .select(
        "room_id, study_rooms(id,name,code,created_by,created_at)"
      )
      .eq("user_id", user.id);

    console.log("Miembros:", miembros);
    console.log("Error miembros:", error);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const salas = await Promise.all(
      (miembros ?? [])
        .filter((m: any) => m.study_rooms)
        .map(async (m: any) => {
          const { count } = await supabase
            .from("room_members")
            .select("*", { count: "exact", head: true })
            .eq("room_id", m.room_id);

          return {
            id: m.study_rooms.id,
            nombre: m.study_rooms.name,
            codigo: m.study_rooms.code,
            participantes: count ?? 0,
          };
        })
    );

    console.log("Salas:", salas);

    return NextResponse.json(salas);
  } catch (err: any) {
    console.error("ERROR LISTAR SALAS:");
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}