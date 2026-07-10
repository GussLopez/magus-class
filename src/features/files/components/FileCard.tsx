import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";
import { Button } from "@/src/shared/components/ui/button";
import { EllipsisVertical, Star } from "lucide-react";
import { formatFileSize } from "../formatSize";
import { File } from "@/src/shared/types/file.types";

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
          <Button
            size={'icon'}
            variant={'ghost'}
          >
            <EllipsisVertical />
          </Button>
        </div>
      </div>
      <div className="border-b border-input">
        <div className="flex justify-center items-center pt-8 pb-5">
          <PDFIlustration className="size-18" />
        </div>
        <div className="text-center pb-5">
          <p className="font-medium">License Agreement on Waterfall</p>
          <span className="text-sm text-muted-foreground">INC.pdf</span>
        </div>
      </div>

      <div className="flex justify-between pt-3">
        <div>
          <p className="text-sm">Tamaño:</p>
          <span className="text-xs text-muted-foreground"><p>{formatFileSize(file.file_size_bytes)}</p></span>
        </div>

        <div className="w-10 h-10 flex justify-center items-center rounded-xl font-semibold bg-muted">
          G
        </div>
      </div>
    </div>
  )
}
