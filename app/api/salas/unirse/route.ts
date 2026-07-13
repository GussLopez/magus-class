import { createClient } from "../../../../src/shared/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { codigo } = await req.json();

    const { data: sala, error: errorSala } = await supabase
      .from("study_rooms")
      .select("*")
      .eq("code", codigo?.toUpperCase())
      .maybeSingle();

    if (errorSala || !sala) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    const { error: errorMiembro } = await supabase
      .from("room_members")
      .upsert(
        { room_id: sala.id, user_id: user.id, role: "member" },
        { onConflict: "room_id,user_id", ignoreDuplicates: true }
      );

    if (errorMiembro) {
      return NextResponse.json({ error: errorMiembro.message }, { status: 500 });
    }

    return NextResponse.json({ id: sala.id, nombre: sala.name, codigo: sala.code });
  } catch (err: any) {
    console.error("ERROR UNIRSE:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}