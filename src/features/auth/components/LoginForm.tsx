'use client'

import { Button } from "@/src/shared/components/ui/button"
import { Checkbox } from "@/src/shared/components/ui/checkbox"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { Separator } from "@/src/shared/components/ui/separator"
import { Google } from "@/src/shared/svg/Google"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {

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
        <span className="shrink-0 text-xs text-muted-foreground/60">o continua con tu e-mail</span>
        <Separator className="w-full bg-neutral-100" />
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
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
        />
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <Checkbox id="remember" />
          <label htmlFor="remember">Recuerdame</label>
        </div>
        <Link href={'/auth/recover'} className="text-primary">Olvidaste tu contraseña?</Link>
      </div>

      <Button className="w-full">
        Acceder
      </Button>
      <div className="flex justify-center gap-2 text-muted-foreground">
        No tienes cuenta?
        <span className="flex items-center gap-0.5 font-medium text-primary group">
          <Link href={'/auth/register'}>Registrate</Link>
          <ArrowUpRight className="size-3 stroke-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  )
}
