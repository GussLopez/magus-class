"use client";

import Image from "next/image";

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
            <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
              Magus ClassRoom
            </h1>
          </a>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#">Inicio</a>
          <a href="#">Funciones</a>
          <a href="#">Dashboard</a>
          <a href="#">Contacto</a>
        </nav>

        {/* BOTONES */}
        
        <div className="flex justify-center md:justify-end gap-3 flex-wrap">
          <a href="/login">
          <button className="bg-cyan-500 hover:bg-cyan-400 transition px-4 py-2 rounded-xl font-semibold text-sm md:text-base">
            Iniciar sesión
          </button>
          </a>

          <a href="/register">
            <button className="border border-white/20 hover:bg-white/10 transition px-4 py-2 rounded-xl font-semibold text-sm md:text-base">
              Registrarse
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}