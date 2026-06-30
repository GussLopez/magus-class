import { Button } from "@/src/shared/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/src/shared/components/ui/drawer";
import { BookOpen, FileText, CircleCheck } from "lucide-react";
import { RagSource } from "../types/chat.types";

interface RagResourcesProps {
  sources: RagSource[]
}

export default function RagSourcesDrawer({ sources }: RagResourcesProps) {

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant={'ghost'}
          size={'sm'}
        >
          <BookOpen />
          Fuentes
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="mb-2">
          <DrawerTitle>Fuentes</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col space-y-2 mt-3">
          <div className="flex gap-2 h-12">
            <div className="flex h-full w-4 shrink-0 flex-col items-center">
              <div className="flex h-5.5 shrink-0 items-center justify-center">
                <FileText className="shrink-0 size-3.75 " />
              </div>
              <div className="bg-input h-full w-px rounded-full"></div>
            </div>
            <div>
              Leyendo documento
            </div>
          </div>
          {sources.map((source, index) => (
            <div
              key={`${source.chunk_index}-${index}`}
              className="flex gap-2 h-fit overflow-clip"
            >
              <div className="flex h-full w-4 shrink-0 flex-col items-center">
                <div className="flex h-5 shrink-0 items-center justify-center">
                  <div className="flex h-1.5 w-1.5 rounded-full shrink-0 bg-foreground" />
                </div>
                <div className="bg-input h-full w-px rounded-full"></div>
              </div>
              <div className="pb-3">
                <p className="mb-2 text-sm font-medium">
                  Página {source.page_number ?? "N/A"} · Chunk{" "}
                  {source.chunk_index}
                </p>

                <p className="line-clamp-3 text-xs text-muted-foreground">
                  {source.content}
                </p>
              </div>
            </div>
          ))}
          <div className="flex gap-2 h-12">
            <div className="flex h-full w-4 shrink-0 flex-col items-center">
              <div className="flex h-5.5 shrink-0 items-center justify-center">
                <CircleCheck className="shrink-0 size-3.75 " />
              </div>
            </div>
            <div>
              <p>Pensado durante 45s</p>
              <span className="text-muted-foreground">Listo</span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
