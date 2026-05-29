'use client'

import { Button } from "@/src/shared/components/ui/button"
import { Checkbox } from "@/src/shared/components/ui/checkbox"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { Separator } from "@/src/shared/components/ui/separator"
import { Google } from "@/src/shared/svg/Google"
import { ArrowUpRight, Eye, EyeClosed, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RegisterForm() {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className="mt-6 space-y-5">
      <div>
        <Button
          variant={'outline'}
          className="w-full gap-3"
        >
          <Google />
          Continuar con Google
        </Button>
      </div>
      <div className="flex justify-center gap-5 items-center overflow-hidden">
        <Separator className="w-full bg-neutral-100" />
        <span className="shrink-0 text-xs text-muted-foreground/60">o registrate con tu e-mail</span>
        <Separator className="w-full bg-neutral-100" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          type="text"
          placeholder="Juan"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Correo</Label>
        <Input
          id="email"
          type="email"
          placeholder="juan@gmail.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={viewPassword ? 'text' : 'password'}
            placeholder="••••••••"
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground"
            onClick={() => setViewPassword(prev => !prev)}
          >
            {viewPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <Checkbox id="remember" />
        <label htmlFor="remember">
          Acepto los <Link href={'/'} className="underline">Terminos y Condiciones</Link>
        </label>
      </div>

      <Button className="w-full">
        Crear cuenta
      </Button>
      <div className="flex justify-center gap-2 text-muted-foreground">
        Ya tienes cuenta?
        <span className="flex items-center gap-0.5 font-medium text-primary group">
          <Link href={'/auth/register'}>Inicia sesión</Link>
          <ArrowUpRight className="size-3 stroke-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  )
}
