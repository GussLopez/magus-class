import { Button } from "@/src/shared/components/ui/button";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/shared/components/ui/select";
import { Textarea } from "@/src/shared/components/ui/textarea";
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

      <label className="mb-2 block text-sm">
        Instrucciones (opcional)
      </label>

      <Textarea
        placeholder="Agrega instrucciones adicionales para personalizar el resumen..."
        className="min-h-32 w-full resize-none"
      />

      <label className="mb-2 mt-5 block text-sm text-blue-100/80">
        Longitud del resumen
      </label>

      <div className="relative">
        <Clock3 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />

        <Select defaultValue="corto">
          <SelectTrigger className="w-full pl-10">
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="corto">Corto</SelectItem>
            <SelectItem value="mediano">Mediano</SelectItem>
            <SelectItem value="Extenso">Extenso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-sm text-blue-100/80">
          Incluir en el resumen
        </h3>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <Checkbox defaultChecked />
            <List className="h-4 w-4 text-blue-400" />
            <span>Puntos clave</span>
          </label>

          <label className="flex items-center gap-3">
            <Checkbox defaultChecked />
            <HelpCircle className="h-4 w-4 text-blue-400" />
            <span>Preguntas de examen</span>
          </label>

          <label className="flex items-center gap-3">
            <Checkbox defaultChecked />
            <Layers className="h-4 w-4 text-blue-400" />
            <span>Flashcards</span>
          </label>
        </div>
      </div>

      <Button className="mt-8 w-full" size={'lg'}>
        <Sparkles className="h-4 w-4" />
        Generar resumen
      </Button>
    </div>
  )
}
