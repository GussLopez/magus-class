"use client";

import Header from "@/src/shared/components/Header";
import Footer from "@/src/shared/components/Footer";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          
          <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
            Registrarse
          </h1>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              placeholder="correo@universidad.com"
              className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 transition py-3 rounded-xl font-bold"
            >
              Crear cuenta
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="text-cyan-400 hover:underline"
            >
              Iniciar sesión
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}