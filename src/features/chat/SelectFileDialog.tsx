import { Button } from "@/src/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/components/ui/dialog";
import { Paperclip } from "lucide-react";

export default function SelectFileDialog() {

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          type="button"
          className="bg-muted hover:bg-muted! text-muted-foreground cursor-pointer"
        >
          <Paperclip className="size-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona un archivo</DialogTitle>
        </DialogHeader>
        <div>
          Content
        </div>
      </DialogContent>
    </Dialog>
  )
}
