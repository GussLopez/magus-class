"use client";

import Header from "@/src/shared/components/Header";
import Footer from "@/src/shared/components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          
          <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
            Iniciar Sesión
          </h1>

          <form className="space-y-5">
            
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Correo
              </label>

              <input
                type="email"
                placeholder="correo@universidad.com"
                className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="********"
                className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 transition py-3 rounded-xl font-bold"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-cyan-400 hover:underline"
            >
              Registrarse
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}