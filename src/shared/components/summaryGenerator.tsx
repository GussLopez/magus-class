"use client";

import {
  FileText,
  Sparkles,
  Settings,
  Download,
  Copy,
  Folder,
  File,
  Search,
  List,
  HelpCircle,
  Layers,
  Clock3,
} from "lucide-react";

export function SummaryGenerator() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#06142d] via-[#081b3c] to-[#0a2250] text-white">
      <div className="w-full px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/20">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                Generador de Resúmenes
              </h1>

              <p className="mt-2 text-lg text-blue-100/70">
                Genera un resumen inteligente utilizando el contenido almacenado
                en el RAG.
              </p>
            </div>
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          {/* PANEL IZQUIERDO */}
          <div className="space-y-6">
            {/* CONFIGURACIÓN */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-400" />
                <h2 className="text-2xl font-semibold">
                  Configuración
                </h2>
              </div>

              <label className="mb-2 block text-sm text-blue-100/80">
                Instrucciones (opcional)
              </label>

              <textarea
                placeholder="Agrega instrucciones adicionales para personalizar el resumen..."
                className="h-32 w-full resize-none rounded-2xl border border-white/10 bg-[#07152f] p-4 outline-none transition focus:border-blue-500"
              />

              <label className="mb-2 mt-5 block text-sm text-blue-100/80">
                Longitud del resumen
              </label>

              <div className="relative">
                <Clock3 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />

                <select className="w-full rounded-2xl border border-white/10 bg-[#07152f] py-4 pl-11 pr-4 outline-none">
                  <option>Corto</option>
                  <option>Medio</option>
                  <option>Extenso</option>
                </select>
              </div>

              <div className="mt-6">
                <h3 className="mb-4 text-sm text-blue-100/80">
                  Incluir en el resumen
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    <List className="h-4 w-4 text-blue-400" />
                    <span>Puntos clave</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    <HelpCircle className="h-4 w-4 text-blue-400" />
                    <span>Preguntas de examen</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    <Layers className="h-4 w-4 text-blue-400" />
                    <span>Flashcards</span>
                  </label>
                </div>
              </div>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-medium transition hover:bg-blue-500">
                <Sparkles className="h-4 w-4" />
                Generar resumen
              </button>
            </div>

            {/* FUENTE */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <Folder className="h-5 w-5 text-blue-400" />

                <h2 className="text-xl font-semibold">
                  Fuente
                </h2>
              </div>

              <div className="space-y-4 text-blue-100/80">
                <p>
                  <span className="text-blue-400">Tema:</span>{" "}
                  Introducción a IA
                </p>

                <div className="flex items-center gap-3">
                  <File className="h-4 w-4" />
                  3 PDFs indexados
                </div>

                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4" />
                  4 fragmentos recuperados
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO */}
          <div className="h-[calc(100vh-180px)] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-400" />

                <h2 className="text-2xl font-semibold">
                  Resumen generado
                </h2>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 hover:bg-white/5">
                  <Copy className="h-4 w-4" />
                  Copiar
                </button>

                <button className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 hover:bg-white/5">
                  <Download className="h-4 w-4" />
                  PDF
                </button>
              </div>
            </div>

            {/* ESTADO VACÍO */}
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-blue-600/10">
                <FileText className="h-16 w-16 text-blue-400" />
              </div>

              <h3 className="text-4xl font-bold">
                Aún no hay un resumen generado
              </h3>

              <p className="mt-4 max-w-lg text-lg text-blue-100/60">
                Configura las opciones de la izquierda y haz clic en
                <span className="font-medium text-blue-300">
                  {" "}
                  "Generar resumen"
                </span>{" "}
                para obtener el resultado aquí.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}