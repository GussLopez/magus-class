import CreateFile from "@/src/features/files/components/CreateFile"
import { Button } from "@/src/shared/components/ui/button"
import { EllipsisVertical, File, FileText, Folder, Plus } from "lucide-react"

export default function ArchivosPage() {

  return (
    <main>
      <div className="grid grid-cols-4 gap-5">
        <CreateFile />
        <button className="p-4 border border-input rounded-xl hover:bg-muted relative group cursor-pointer text-start transition-colors duration-150">
          <div className="absolute top-3 right-3 text-muted-foreground">
            <Plus className="size-5.5 group-hover:size-4.5 transition-all duration-150" />
          </div>
          <div className="w-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-white transition-colors duration-150">
            <Folder className="size-4.5" />
          </div>
          <p className="mt-3 font-semibold">Crear carpeta</p>
        </button>
      </div>
      <div className="mt-5">
        <h2 className="font-medium">Recientes</h2>
        <div className="grid grid-cols-3 gap-5 mt-3">
          <div className="flex gap-3 p-3 border border-input rounded-xl relative">
            <Button
              variant={'ghost'}
              size={'icon-xs'}
              className="absolute top-2 right-2 text-muted-foreground"
            >
              <EllipsisVertical />
            </Button>

            <div className="w-fit h-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-white transition-colors">
              <FileText className="size-4.5" />
            </div>
            <div>
              <p className="text-sm font-medium">Dashboard tech requeriments</p>
              <span className="text-xs text-muted-foreground">220 KB docx</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
