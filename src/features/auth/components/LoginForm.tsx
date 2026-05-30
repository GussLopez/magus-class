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
import { SignInInput } from "../../types/auth.types"
import { useForm } from "react-hook-form"
import { redirect } from "next/navigation"
import ErrorMessage from "@/src/shared/components/ui/ErrorMessage"
import { sileo } from "sileo"

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const [authError, setAuthError] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const initalValues: SignInInput = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initalValues
  });

  const handleLogin = async (formData: SignInInput) => {
    setLoading(true);
    setAuthError(null);

    const { email, password } = formData;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log(error);
      setLoading(false);

      if (error.message === "Invalid login credentials") {
        setAuthError("Correo o contraseña incorrectos");
      } else if (error.message === "Email not confirmed") {
        setPendingEmail(email);
        setAuthError("Debes confirmar tu correo electrónico antes de iniciar sesión.");
      } else {
        setAuthError(error.message);
      }

      return;
    }

    if (data?.user && !data.user.email_confirmed_at) {
      setAuthError("Debes confirmar tu correo antes de iniciar sesión");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    setLoading(false);
    redirect('/dashboard');
  }

  const resendConfirmationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email
    });
    if (error) {
      sileo.error({
        title: error.message
      });
      return;
    }
    sileo.info({
      title: 'Correo de confirmación enviado'
    })
  }
  console.log(initalValues.email);
  return (
    <form
      className="mt-6 space-y-5"
      onSubmit={handleSubmit(handleLogin)}
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
        <span className="shrink-0 text-xs text-muted-foreground/60">o continua con tu e-mail</span>
        <Separator className="w-full bg-neutral-100" />
      </div>
      {authError && (
        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md">
          {authError} {" "}
          <span onClick={() => resendConfirmationEmail(pendingEmail)} className="underline cursor-pointer">Volver a envíar</span>
        </div>
      )}
      <div>
        <Label htmlFor="email" className="mb-2">Correo</Label>
        <Input
          id="email"
          type="email"
          placeholder="juan@gmail.com"
          aria-invalid={errors.email?.message ? 'true' : 'false'}
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
    </form>
  )
}
