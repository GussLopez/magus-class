import CreateFile from "@/src/features/files/components/CreateFile"
import { Folder, Plus } from "lucide-react"

export default function ArchivosPage() {

  return (
    <main>
      <div className="grid grid-cols-4 gap-5">
        <CreateFile />
        <button className="p-4 border border-input rounded-xl hover:bg-muted relative group cursor-pointer text-start">
          <div className="absolute top-3 right-3 text-muted-foreground">
            <Plus className="size-5.5 group-hover:size-4.5 transition-all duration-100" />
          </div>
          <div className="w-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-white transition-colors">
            <Folder className="size-4.5" />
          </div>
          <p className="mt-3 font-semibold">Crear carpeta</p>
        </button>
      </div>
      <h1>Archivos</h1>

    </main>
  )
}
