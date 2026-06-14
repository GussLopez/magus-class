import { Button } from "@/src/shared/components/ui/button";
import { Sparkles, Copy, Download, FileText } from "lucide-react";

export default function SumPreview() {

  return (
    <div className="h-[calc(100vh-180px)] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-400" />

          <h2 className="text-2xl font-semibold">
            Resumen generado
          </h2>
        </div>

        <div className="flex gap-3">
          <Button variant={'outline'}>
            <Copy className="h-4 w-4" />
            Copiar
          </Button>

          <Button variant={'outline'}>
            <Download className="h-4 w-4" />
            PDF
          </Button>
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

        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          Configura las opciones de la izquierda y haz clic en
          <span className="font-medium text-primary">
            {" "}
            "Generar resumen"
          </span>{" "}
          para obtener el resultado aquí.
        </p>
      </div>
    </div>
  )
}
