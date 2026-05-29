import LoginForm from "@/src/features/auth/components/LoginForm";
import { Hexagon } from "lucide-react";

export default function LoginPage() {

  return (
    <div className="max-w-sm w-full mx-auto px-4 pt-28">
      <div className="flex flex-col items-center gap-2">
        <Hexagon />
        <h1 className="text-2xl font-semibold">Bienvenido de Nuevo</h1>
        <p className="text-sm text-muted-foreground">Inicia sesión para acceder a la plataforma</p>
      </div>
      <LoginForm />
    </div>
  )
}
