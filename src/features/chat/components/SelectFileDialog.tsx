'use client';
import { Button } from "@/src/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/components/ui/dialog";
import { useUserStore } from "@/src/shared/store/UserStore";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { File } from "@/src/shared/types/file.types";
import { useQuery } from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import { useState } from "react";
import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";
import { Skeleton } from "@/src/shared/components/ui/skeleton";

interface SelectFileProps {
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;
  disabled?: boolean;
}

export default function SelectFileDialog({ selectedFile, setSelectedFile, disabled }: SelectFileProps) {
  const [open, setOpen] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const user = useUserStore(state => state);
  const fetchAllFiles = async () => {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Error fetching');

    return res.json();
  }

  const { data, isLoading } = useQuery<File[]>({
    queryKey: ["user-files"],
    queryFn: fetchAllFiles,
    retry: 1,
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={selectedFile ? 'sm' : 'icon-lg'}
          variant={'ghost'}
          type="button"
          disabled={disabled}
          className={`bg-muted hover:bg-muted! text-muted-foreground cursor-pointer ${selectedFile && 'py-2 h-full bg-primary/10 text-primary'
            }`}
        >
          <Paperclip className="size-4.5" />
          {selectedFile && (
            <span className="text-xs">{selectedFile.title}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Selecciona un archivo</DialogTitle>
          <DialogDescription>Selecciona un archivo para empezar a consultar información</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-5 max-h-100 overflow-y-auto">
          {isLoading && [...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-full h-40" />
          ))}
          {data?.map((file) => (
            <div
              key={file.id}
              onClick={() => {
                setSelectedFile(file);
                setOpen(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-muted relative hover:bg-primary/10 border-3 border-transparent hover:border-primary transition-all cursor-pointer group"
            >
              <div className="group-hover:scale-105 transition-transform duration-200">
                <div className="flex justify-center items-center py-3">
                  <PDFIlustration className="size-12" />
                </div>
                <div className="text-center pb-5">
                  <p className="text-xs">{file.title}</p>
                  <span className="text-xs text-muted-foreground">{file.file_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
