'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/components/ui/dialog";
import { FileText, Plus } from "lucide-react";
import FileUpload from "./FileInput";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { useEffect, useState } from "react";
import { sileo } from "sileo";
import { Label } from "@/src/shared/components/ui/label";
import { Input } from "@/src/shared/components/ui/input";
import UploadingAnimation from "./UploadingAnimation";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateFile() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const queryClient = useQueryClient();

  const uploadDocument = async (file: File) => {
    try {
      setLoading(true);

      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("No hay sesión activa");
      }

      const formData = new FormData();

      formData.append("file", file);
      formData.append("title", title.trim() || file.name.replace(/\.pdf$/i, ""));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`
        },
        body: formData
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.detail || "Error al subir el documento.");
      }

      sileo.info({
        title: "Documento subido correctamente",
        description: "El PDF fue procesado y ya puedes hacer preguntas sobre él.",
      });

      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["user-files"] });
      setOpen(false);
      router.refresh();
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error desconocido al subir el documento.";

      sileo.error({
        title: "Error al subir documento",
        description: message,
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProcessingProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + 5;
      });
    }, 400)

    return () => clearInterval(interval);
  }, [loading])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-4 border border-input rounded-xl hover:bg-muted relative group cursor-pointer text-start transition-colors duration-150">
          <div className="absolute top-3 right-3 text-muted-foreground">
            <Plus className="size-5.5 group-hover:size-4.5 transition-all duration-150" />
          </div>
          <div className="w-fit p-2 bg-muted group-hover:bg-primary rounded-lg group-hover:text-white transition-all duration-150">
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
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-2">
              Título del documento
            </Label>
            <Input
              id="title"
              placeholder="Ej. Apuntes de limpieza de datos"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-input p-6">
              <UploadingAnimation progress={processingProgress} />

              <div className="text-center">
                <p className="text-sm font-medium">
                  Procesando documento...
                </p>
                <p className="text-xs text-muted-foreground">
                  Extrayendo texto, creando chunks y generando embeddings.
                </p>
              </div>
            </div>
          ) : (
            <FileUpload
              acceptedFileTypes={["application/pdf"]}
              maxFileSize={20 * 1024 * 1024}
              uploadDelay={500}
              validateFile={() => {
                if (loading) {
                  return {
                    message: "Espera a que termine la subida actual.",
                    code: "UPLOAD_IN_PROGRESS"
                  };
                }
                if (!title.trim()) {
                  return {
                    message: "Escribe el título antes de subir el archivo",
                    code: "TITLE_REQUIRED",
                  }
                }

                return null;
              }}
              onUploadSuccess={uploadDocument}
              onUploadError={(error) => {
                sileo.error({
                  title: "Archivo inválido",
                  description: error.message,
                });
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


