'use client'

import { Button } from "@/src/shared/components/ui/button"
import { Checkbox } from "@/src/shared/components/ui/checkbox"
import { Input } from "@/src/shared/components/ui/input"
import { Label } from "@/src/shared/components/ui/label"
import { Separator } from "@/src/shared/components/ui/separator"
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client"
import { Google } from "@/src/shared/svg/Google"
import { ArrowUpRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SignUpInput } from "../types/auth.types"
import { useForm } from "react-hook-form"
import { sileo } from "sileo"
import { redirect } from "next/navigation"
import { Spinner } from "@/src/shared/components/ui/spinner"
import ErrorMessage from "@/src/shared/components/ui/ErrorMessage"

export default function RegisterForm() {
  const [viewPassword, setViewPassword] = useState(false);
  const [checked, setCheked] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const initialValues: SignUpInput = {
    name: "",
    email: "",
    password: "",
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues
  })

  const handleRegister = async (formData: SignUpInput) => {
    if (!checked) {
      sileo.warning({
        title: 'Acepta los términos y condiciones para registrate'
      });
      return;
    }
    setLoading(true);
    const { name, email, password } = formData;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          email
        }
      }
    })
    setLoading(false);
    if (error) {
      sileo.error({
        title: 'Error al registrarte',
        description: 'Ocurrio un error al registrarte, intenta más tarde'
      });
      return;
    }

    redirect('/auth/login');
  }
  return (
    <form
      className="mt-6 space-y-5"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div>
        <Button
          variant={'outline'}
          className="w-full gap-3"
          type="button"
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

      <div>
        <Label htmlFor="name" className="mb-2">Nombre</Label>
        <Input
          id="name"
          type="text"
          aria-invalid={errors.name?.message ? 'true' : 'false'}
          placeholder="Juan"
          {...register('name', {
            required: 'El nombre es requerido'
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">Correo</Label>
        <Input
          id="email"
          type="email"
          aria-invalid={errors.email?.message ? 'true' : 'false'}
          placeholder="juan@gmail.com"
          {...register('email', {
            required: 'El email es requerido'
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div>
        <Label htmlFor="password" className="mb-2">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={viewPassword ? 'text' : 'password'}
            aria-invalid={errors.password?.message ? 'true' : 'false'}
            placeholder="••••••••"
            {...register('password', {
              required: 'La contraseña es requerida'
            })}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground"
            onClick={() => setViewPassword(prev => !prev)}
            type="button"
          >
            {viewPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        </div>
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <Checkbox id="remember" onCheckedChange={e => setCheked(e ? true : false)} />
        <label htmlFor="remember">
          Acepto los <Link href={'/'} className="underline">Terminos y Condiciones</Link>
        </label>
      </div>

      <Button
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner className="size-4.5" />
            Creando
          </>
        ) : 'Crear cuenta'}
      </Button>
      <div className="flex justify-center gap-2 text-muted-foreground">
        Ya tienes cuenta?
        <span className="flex items-center gap-0.5 font-medium text-primary group">
          <Link href={'/auth/login'}>Inicia sesión</Link>
          <ArrowUpRight className="size-3 stroke-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </form>
  )
}
