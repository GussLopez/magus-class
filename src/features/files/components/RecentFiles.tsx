'use client'

import { Button } from "@/src/shared/components/ui/button";
import { EllipsisVertical, FileText } from "lucide-react";

export default function RecentFiles() {

  return (
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
  )
}
