import LoginForm from "@/src/features/auth/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
 
  
  return (
    <div className="max-w-sm w-full mx-auto px-4 pt-4">
      <div className="flex flex-col items-center gap-2">
        <div>
          <Image
            src={'/img/logo.png'}
            alt="Magus Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-2xl font-semibold mt-4">Bienvenido de Nuevo</h1>
        <p className="text-sm text-muted-foreground">Inicia sesión para acceder a la plataforma</p>
      </div>
      <LoginForm />
    </div>
  )
}
