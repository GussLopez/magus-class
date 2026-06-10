import { Settings, Clock3, List, HelpCircle, Layers, Sparkles } from "lucide-react";

export default function SumConfig() {

  return (
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
  )
}
