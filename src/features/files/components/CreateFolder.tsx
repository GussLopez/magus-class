'use client'

import { Plus, Folder } from "lucide-react";

export default function CreateFolder() {

  return (
    <button className="p-4 border border-input rounded-xl hover:bg-muted relative group cursor-pointer text-start transition-colors duration-150">
      <div className="absolute top-3 right-3 text-muted-foreground">
        <Plus className="size-5.5 group-hover:size-4.5 transition-all duration-150" />
      </div>
      <div className="w-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-white transition-colors duration-150">
        <Folder className="size-4.5" />
      </div>
      <p className="mt-3 font-semibold">Crear carpeta</p>
    </button>
  )
}
