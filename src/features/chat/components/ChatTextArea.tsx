'use client'

import { Button } from "@/src/shared/components/ui/button";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { CheckIcon, ChevronRight, Copy, Send } from "lucide-react";
import { useState } from "react";
import SelectFileDialog from "./SelectFileDialog";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { sileo } from "sileo";
import { useForm } from "react-hook-form";
import { AskForm, RagResponse } from "../types/chat.types";
import AITextLoading from "./AiTextLoading";
import { File } from "@/src/shared/types/file.types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/src/shared/components/ui/collapsible";
import { cn } from "@/src/shared/lib/utils";

export default function ChatTextArea() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [ragResponse, setRagResponse] = useState<RagResponse | null>(null);
  const hasConversation = Boolean(ragResponse || loading);
  const [question, setQuestion] = useState<string | null>(null);
  const [openRef, setOpenRef] = useState(false);
  const [copied, setCopied] = useState(false);

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
      setQuestion(formData.question);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rag/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          document_id: selectedFile.id,
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
  const handleCopy = async () => {
    try {
      if (!question) return;

      await navigator.clipboard.writeText(question);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
  return (
    <div
      className={`flex h-full w-full flex-col ${!hasConversation ? "justify-center" : ""
        }`}
    >
      {!hasConversation ? (
        <div className="w-full">
          <h1 className="mb-6 text-center text-[32px] font-semibold">
            ¿Por dónde quiere comenzar?
          </h1>

          <form
            className="w-full"
            onSubmit={handleSubmit(sendQuestion)}
          >
            <div className="relative">
              <Textarea
                className="min-h-30 w-full resize-none rounded-xl border border-input bg-background! p-4 pr-16 pb-12 duration-300 focus-visible:border-muted-foreground/40"
                placeholder="¿Cuál es tu pregunta de hoy?"
                disabled={loading}
                {...register("question", {
                  required: "La pregunta es requerida",
                  minLength: {
                    value: 3,
                    message: "La pregunta debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 1000,
                    message: "La pregunta no debe superar los 1000 caracteres",
                  },
                })}
              />

              <div className="absolute bottom-0 flex w-full items-center justify-between p-3">
                <SelectFileDialog
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />

                <Button
                  size="icon-lg"
                  variant="ghost"
                  type="submit"
                  disabled={loading}
                  className="group cursor-pointer bg-muted text-muted-foreground hover:bg-muted!"
                >
                  <Send className="size-4.5" />
                </Button>
              </div>
            </div>

            {errors.question && (
              <p className="mt-2 text-sm text-red-500">
                {errors.question.message}
              </p>
            )}
          </form>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto py-6 pb-6">
            {question && (
              <div className="flex flex-col items-end gap-1 group">
                <div className="p-4 rounded-2xl rounded-tr-none bg-muted">
                  <p>{question}</p>
                </div>
                <div className="h-10">
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    className="relative opacity-0 group-hover:opacity-100 transition-all duration-500"
                    onClick={handleCopy}
                    disabled={copied}
                  >
                    <span className={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
                      <CheckIcon className='stroke-green-600 dark:stroke-green-400' />
                    </span>
                    <span className={cn('absolute  transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}>
                      <Copy className="size-4 " />
                    </span>
                  </Button>
                </div>
              </div>
            )}
            {ragResponse && (
              <div className="space-y-3">
                <div>
                  <p className="mb-1 font-semibold">Respuesta</p>
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                    {ragResponse.answer}
                  </p>
                </div>

                {ragResponse.sources.length > 0 && (
                  <div className="p-2 border border-input rounded-xl bg-muted/30">
                    <Collapsible open={openRef} onOpenChange={setOpenRef}>
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center gap-2">
                          <ChevronRight
                            className={` size-4
                              ${openRef ? 'rotate-90' : ' rotate-0'} transition-transform duration-200
                            `}
                          />
                          <p className="text-sm font-semibold">Fuentes</p>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-2 mt-3">
                          {ragResponse.sources.map((source, index) => (
                            <div
                              key={`${source.chunk_index}-${index}`}
                              className="rounded-lg border bg-background p-3"
                            >
                              <p className="mb-1 text-xs font-medium text-muted-foreground">
                                Página {source.page_number ?? "N/A"} · Chunk{" "}
                                {source.chunk_index}
                              </p>

                              <p className="line-clamp-3 text-xs text-muted-foreground">
                                {source.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div>
                <AITextLoading
                  texts={[
                    "Consultando documento...",
                    "Pensando...",
                    "Generando respuesta...",
                  ]}
                  interval={4000}
                  className="justify-start text-base"
                />
              </div>
            )}
          </div>

          <div className="sticky bottom-0 z-20 w-full bg-background/65 pb-4 backdrop-blur-xl">
            <form
              className="w-full"
              onSubmit={handleSubmit(sendQuestion)}
            >
              <div className="relative">
                <Textarea
                  className="min-h-30 w-full resize-none rounded-xl border border-input p-4 pr-16 pb-12 shadow-lg duration-300 focus-visible:border-muted-foreground/40"
                  placeholder="¿Cuál es tu pregunta de hoy?"
                  disabled={loading}
                  {...register("question", {
                    required: "La pregunta es requerida",
                    minLength: {
                      value: 3,
                      message: "La pregunta debe tener al menos 3 caracteres",
                    },
                    maxLength: {
                      value: 1000,
                      message: "La pregunta no debe superar los 1000 caracteres",
                    },
                  })}
                />

                <div className="absolute bottom-0 flex w-full items-center justify-between p-3">
                  <SelectFileDialog
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />

                  <Button
                    size="icon-lg"
                    variant="ghost"
                    type="submit"
                    disabled={loading || errors.question ? true : false}
                    className="group cursor-pointer bg-muted text-muted-foreground hover:bg-muted!"
                  >
                    <Send className="size-4.5" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}