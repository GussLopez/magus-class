import { createClient } from "@/src/shared/supabase/server-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error Swapping code: ", error.message);

      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }
  return NextResponse.redirect(`${requestUrl.origin}/login`);
}
