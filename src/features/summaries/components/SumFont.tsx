import { File, Folder, Search } from "lucide-react";

export default function SumFont() {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <Folder className="h-5 w-5 text-primary" />

        <h2 className="text-xl font-semibold">
          Fuente
        </h2>
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          <span className="text-primary">Tema:</span>{" "}
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
  )
}
