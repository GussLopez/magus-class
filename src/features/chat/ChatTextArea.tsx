'use client'

import { Button } from "@/src/shared/components/ui/button";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import SelectFileDialog from "./SelectFileDialog";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { sileo } from "sileo";
import { useForm } from "react-hook-form";
import { AskForm, RagResponse } from "./types/chat.types";
import ErrorMessage from "@/src/shared/components/ui/ErrorMessage";

export default function ChatTextArea() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ragResponse, setRagResponse] = useState<RagResponse | null>(null);

  const supabase = getSupabaseBrowserClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AskForm>({
    defaultValues: {
      question: ""
    }
  });

  const sendQuestion = async (formData: AskForm) => {
    try {
      setLoading(true);
      setRagResponse(null);

      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("No hay sesión activa");
      }

      if (!selectedFile) {
        sileo.warning({
          title: 'Selecciona un archivo primero'
        })
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          document_id: selectedFile,
          question: formData.question
        })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data.detail || "Error interno en el servidor");
      }

      setRagResponse(data);
      reset();
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error al enviar la pregunta";

      sileo.error({
        title: "Error al consultar el documento",
        description: message
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">

      <form
        className="relative"
        onSubmit={handleSubmit(sendQuestion)}
      >
        <Textarea
          className="w-175 h-30 p-4 border rounded-xl border-input focus-visible:border-muted-foreground/40 resize-none duration-300"
          placeholder="¿Cuál es tu pregunta de hoy?"
          disabled={loading}
          {...register('question', {
            required: "La pregunta es requerida",
            minLength: {
              value: 3,
              message: "La pregunta debe tener al menos 3 caracteres"
            },
            maxLength: {
              value: 1000,
              message: "La pregunta no debe superar los 1000 caracteres"
            }
          })}
        />

        <div className="w-full absolute bottom-0 flex justify-between p-3">
          <SelectFileDialog setSelectedFile={setSelectedFile} />

          <Button
            size={'icon-lg'}
            variant={'ghost'}
            type="submit"
            disabled={loading}
            className="bg-muted hover:bg-muted! text-muted-foreground cursor-pointer group"
          >
            <Send className="size-4.5" />
          </Button>
        </div>
      </form>
      {errors.question && (
        <ErrorMessage>
          {errors.question.message}
        </ErrorMessage>
      )}

      {selectedFile && (
        <p className="text-xs text-muted-foreground">
          Documento seleccionado correctamente.
        </p>
      )}

      {loading && (
        <p className="text-sm text-muted-foreground">
          Consultando documento...
        </p>
      )}

      {ragResponse && (
        <div className="rounded-xl border border-input bg-muted/30 p-4 space-y-3">
          <div>
            <p className="font-semibold mb-1">Respuesta</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {ragResponse.answer}
            </p>
          </div>

          {ragResponse.sources.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Fuentes</p>

              <div className="space-y-2">
                {ragResponse.sources.map((source, index) => (
                  <div
                    key={`${source.chunk_index}-${index}`}
                    className="rounded-lg border bg-background p-3"
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Página {source.page_number ?? "N/A"} · Chunk {source.chunk_index}
                    </p>

                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {source.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
