import LoginForm from "@/src/features/auth/components/LoginForm";
import { Hexagon } from "lucide-react";

export default function LoginPage() {

  return (
    <div className="max-w-xs w-full mx-auto px-4">
      <div className="flex flex-col items-center gap-2">
        <Hexagon />
        <h1 className="text-2xl font-semibold">Accede a tu cuenta </h1>
      </div>
      <LoginForm />
    </div>
  )
}
