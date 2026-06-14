import { FileText } from "lucide-react";

export default function ExamHeader() {

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-600/20">
          <FileText className="h-8 w-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-5xl font-bold">Exámenes</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Practica con exámenes generados a partir del contenido de tus PDFs
          </p>
        </div>
      </div>
    </div>
  )
}
