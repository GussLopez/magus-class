import { FileText, Plus } from "lucide-react";

export default function CreateFile() {
  
  return (
  <div className="p-4 border border-input rounded-xl hover:bg-muted relative group cursor-pointer">
    <div className="absolute top-3 right-3 text-muted-foreground">
      <Plus className="size-5.5 group-hover:size-4.5 transition-all duration-100" />
    </div>
    <div className="w-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-background transition-colors">
      <FileText className="size-4.5" />
    </div>
    <p className="mt-3 font-semibold">Subir documento</p>
  </div>  
  )  
}
