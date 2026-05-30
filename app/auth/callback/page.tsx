import { redirect } from "next/navigation";
import { createClient } from "@/src/shared/supabase/server-client";

interface CallbackPageProps {
  searchParams: Promise<{
    code?: string;
  }>;
}

export default async function CallbackPage({
  searchParams,
}: CallbackPageProps) {
  const { code } = await searchParams;

  if (!code) {
    redirect("/auth/login");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error(error);
    redirect("/auth/login?error=confirmation_failed");
  }

  redirect("/dashboard");
}