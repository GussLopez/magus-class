import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {

  return (
    <div className="max-w-sm w-full mx-auto px-4 pt-4">
      <div className="flex flex-col items-center gap-2">
        <div>
          <Image
            src={'/img/logo.svg'}
            alt="Magus Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-2xl font-semibold">Crea una Cuenta</h1>
        <p className="text-sm text-muted-foreground text-center">Crea una cuenta con Google o ingresa tus datos para crear una cuenta</p>
      </div>
      <RegisterForm />
    </div>
  )
}
