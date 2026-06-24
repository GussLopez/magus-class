'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/components/ui/dialog";
import { FileText, Plus } from "lucide-react";
import FileUpload from "./FileInput";

export default function CreateFile() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 border border-input rounded-xl hover:bg-muted relative group cursor-pointer text-start">
          <div className="absolute top-3 right-3 text-muted-foreground">
            <Plus className="size-5.5 group-hover:size-4.5 transition-all duration-100" />
          </div>
          <div className="w-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-white transition-colors">
            <FileText className="size-4.5" />
          </div>
          <p className="mt-3 font-semibold">Subir documento</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sube un archivo</DialogTitle>
          <DialogDescription>Arrastra o selecciona un archivo</DialogDescription>
        </DialogHeader>
        <div>
          <FileUpload />
        </div>
      </DialogContent>
    </Dialog>
  )
}


