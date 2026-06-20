"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-4 md:px-12 py-4">

        {/* LOGO */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <a href="/">
            <h1 className="text-xl md:text-2xl font-bold">
              Magus ClassRoom
            </h1>
          </a>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="/">Inicio</a>
          <a href="/funciones">Funciones</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/contacto">Contacto</a>
        </nav>

        {/* BOTONES */}

        <div className="flex justify-center md:justify-end gap-3 flex-wrap">
          <Button asChild>
            <a href="/auth/login">
              Iniciar Sesión
            </a>
          </Button>

          <Button variant={'outline'} asChild>
            <a href="/auth/register">
              Registrarte
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}