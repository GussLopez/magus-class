import { createClient } from "../../../../src/shared/lib/supabase/server";
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

    const { data: sala, error: errorSala } = await supabase
      .from("study_rooms")
      .select(`
    *,
    owner:profiles!study_rooms_created_by_fkey(
      id,
      name,
      last_name,
      avatar_url,
      email
    )
  `)
      .eq("id", id)
      .single();

    if (errorSala || !sala) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    const { data: miembros, error: errorMiembros } = await supabase
      .from("room_members")
      .select(`
      role,
      joined_at,
      profiles(
          id,
          name,
          last_name,
          avatar_url,
          email
      )
  `)
      .eq("room_id", id);

    if (errorMiembros) {
      return NextResponse.json({ error: errorMiembros.message }, { status: 500 });
      
    }

  return NextResponse.json({
  id: sala.id,
  name: sala.name,
  code: sala.code,
  description: sala.description,
  created_at: sala.created_at,

  owner: sala.owner,

  members: (miembros ?? []).map((m: any) => ({
    role: m.role,
    joined_at: m.joined_at,

    profiles: {
      id: m.profiles?.id,
      name: m.profiles?.name,
      last_name: m.profiles?.last_name,
      avatar_url: m.profiles?.avatar_url,
      email: m.profiles?.email,
    },
  })),
});
  } catch (err: any) {
    console.error("ERROR DETALLE SALA:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
    
  }
}

export async function PATCH(
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
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { nombre, descripcion } = await req.json();

    const { data: sala } = await supabase
      .from("study_rooms")
      .select("created_by")
      .eq("id", id)
      .single();

    if (!sala) {
      return NextResponse.json(
        { error: "Sala no encontrada" },
        { status: 404 }
      );
    }

    if (sala.created_by !== user.id) {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("study_rooms")
      .update({
        name: nombre,
        description: descripcion,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
export async function DELETE(
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
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    // Verificar propietario
    const { data: sala, error: errorSala } = await supabase
      .from("study_rooms")
      .select("created_by")
      .eq("id", id)
      .single();

    if (errorSala || !sala) {
      return NextResponse.json(
        { error: "Sala no encontrada" },
        { status: 404 }
      );
    }

    if (sala.created_by !== user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para eliminar esta sala" },
        { status: 403 }
      );
    }

    // Eliminar miembros
    const { error: errorMembers } = await supabase
      .from("room_members")
      .delete()
      .eq("room_id", id);

    if (errorMembers) {
      return NextResponse.json(
        { error: errorMembers.message },
        { status: 500 }
      );
    }

    // Eliminar sala
    const { error: errorDelete } = await supabase
      .from("study_rooms")
      .delete()
      .eq("id", id);

    if (errorDelete) {
      return NextResponse.json(
        { error: errorDelete.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sala eliminada correctamente",
    });

  } catch (err: any) {
    console.error("ERROR ELIMINAR SALA:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}