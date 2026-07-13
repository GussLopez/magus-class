import { createClient } from "../../../../../src/shared/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
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

    const { data, error } = await supabase
      .from("room_members")
      .select(`
        role,
        joined_at,
        profiles(
            id,
            name,
            avatar_url,
            email
        )
      `)
      .eq("room_id", id);

    if (error) {

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );

    }

    return NextResponse.json(data);

  } catch (err:any){

    return NextResponse.json(
      {error:err.message},
      {status:500}
    );

  }

}