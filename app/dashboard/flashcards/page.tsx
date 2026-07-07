'use client'

import { useState } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import SelectFileDialog from "@/src/features/chat/components/SelectFileDialog";
import { File } from "@/src/shared/types/file.types";
import { sileo } from "sileo";

type Flashcard = {
  question: string;
  answer: string;
}

export default function FlashcardPage() {
  const supabase = getSupabaseBrowserClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const generateFlashcards = async () => {
    try {
      if (!selectedFile) {
        sileo.warning({
          title: "Selecciona un documento primero"
        });
        return;
      }

      setLoading(true);

      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("No hay sesión activa");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flashcards/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          document_id: selectedFile.id,
          total: 10
        })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.detail || "Error generando flashcards");
      }

      setFlashcards(data.flashcards);

      sileo.info({
        title: "Flashcards generadas correctamente"
      });

    } catch (error) {
      console.log(error);
      const message = error instanceof Error
        ? error.message
        : "Error desconocido";

      sileo.error({
        title: "Error",
        description: message
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="">
      <div>
        <h1 className="text-3xl font-semibold">
          Flashcards
        </h1>
        <p className="text-muted-foreground">
          Genera tarjetas de estudio automáticamente desde tus documentos.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <SelectFileDialog
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        {selectedFile && (
          <div className="rounded-lg border px-3 py-2 text-sm">
            <p className="font-medium">{selectedFile.title}</p>
            <p className="text-xs text-muted-foreground">
              {selectedFile.file_name}
            </p>
          </div>
        )}

        <Button
          onClick={generateFlashcards}
          disabled={loading}
        >
          {loading ? "Generando..." : "Generar flashcards"}
        </Button>
      </div>

      {flashcards.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {flashcards.map((flashcard, index) => (
            <div
              key={`${flashcard.question}-${index}`}
              className="rounded-xl border bg-card p-4 shadow-sm"
            >
              <p className="mb-2 text-sm font-semibold text-muted-foreground">
                Pregunta {index + 1}
              </p>

              <h2 className="font-semibold">
                {flashcard.question}
              </h2>

              <div className="mt-4 rounded-lg bg-muted p-3">
                <p className="text-sm text-muted-foreground">
                  {flashcard.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}