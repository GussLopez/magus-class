import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";
import { Button } from "@/src/shared/components/ui/button";
import { EllipsisVertical, ExternalLink, FilePen, Star } from "lucide-react";
import { File } from "@/src/shared/types/file.types";
import { formatFileSize } from "../utils/formatSize";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu";
import DeleteFileDialog from "./DeleteFileDialog";

interface FileCardProps {
  file: File
}

export default function FileCard({ file }: FileCardProps) {

  return (
    <div className="p-5 rounded-xl bg-card relative">
      <div className="absolute top-5 w-full px-5 translate-x-1/2 right-1/2 flex justify-between">
        <div>
          <Button
            size={'icon'}
            variant={'ghost'}
          >
            <Star />
          </Button>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={'icon'}
                variant={'ghost'}
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem>
                  <FilePen />
                  Renombrar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink />
                  Abrir en el navegador
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DeleteFileDialog documentId={file.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border-b border-input">
        <div className="flex justify-center items-center pt-8 pb-5">
          <PDFIlustration className="size-18" />
        </div>
        <div className="text-center pb-5">
          <p className="font-medium">{file.title}</p>
          <span className="text-sm text-muted-foreground">{file.file_name}</span>
        </div>
      </div>

      <div className="flex justify-between pt-3">
        <div>
          <p className="text-sm">Tamaño:</p>
          <span className="text-xs text-muted-foreground">{formatFileSize(file.file_size_bytes)}</span>
        </div>

        <div className="w-10 h-10 flex justify-center items-center rounded-xl font-semibold bg-muted">
          {file.user.name.slice(0, 1)}
        </div>
      </div>
    </div>
  )
}
