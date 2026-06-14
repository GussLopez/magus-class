import { FileText } from "lucide-react";

export default function SumHeader() {

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/20">
          <FileText className="h-8 w-8 text-blue-400" />
        </div>

        <div>
          <h1 className="text-5xl font-bold">
            Generador de Resúmenes
          </h1>

          <p className="mt-2 text-lg text-muted-foreground">
            Genera un resumen inteligente utilizando el contenido almacenado
            en el RAG.
          </p>
        </div>
      </div>
    </div>
  )
}
