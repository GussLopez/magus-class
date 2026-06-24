import { FileText, Plus } from "lucide-react";

export default function CreateFile() {
  
  return (
  <div className="p-4 border border-input rounded-xl hover:bg-muted relative group">
    <div className="absolute top-3 right-3 text-muted-foreground">
      <Plus className="size-6 group-hover:size-5 transition-all duration-100" />
    </div>
    <div className="w-fit p-2 bg-foreground rounded-lg text-background">
      <FileText className="size-4.5" />
    </div>
    <p className="mt-3 font-semibold">Subir documento</p>
  </div>  
  )  
}
