'use client'

import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"

export default function LoginForm() {

  return (
    <div className="mt-6 space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email">Correo</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="email"
          placeholder="Password"
        />
      </div>

      <Button className="w-full">
        Acceder
      </Button>
    </div>
  )
}
