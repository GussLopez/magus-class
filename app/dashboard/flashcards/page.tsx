'use client'

import { useState } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import SelectFileDialog from "@/src/features/chat/components/SelectFileDialog";
import { File } from "@/src/shared/types/file.types";
import { sileo } from "sileo";
import { Spinner } from "@/src/shared/components/ui/spinner";
import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";

type InfographicCard = {
  title: string;
  description: string;
  points: string[];
}

export default function FlashcardPage() {
  const supabase = getSupabaseBrowserClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<InfographicCard[]>([]);

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

      setCards(data.cards);

      sileo.info({
        title: "Flashcards generadas correctamente"
      });

    } catch (error) {
      console.log(error);
      sileo.error({
        title: "Error al crear los flashcards",
        autopilot: false
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Flashcards
          </h1>
          <p className="text-muted-foreground">
            Genera tarjetas de estudio automáticamente desde tus documentos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <SelectFileDialog
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <Button
            onClick={generateFlashcards}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner />
                Generando
              </>
            ) : "Generar flashcards"}
          </Button>
        </div>
      </div>

      {selectedFile && (
        <div className="rounded-lg border px-3 py-2 text-sm">
          <p className="font-medium">{selectedFile.title}</p>
          <p className="text-xs text-muted-foreground">
            {selectedFile.file_name}
          </p>
        </div>
      )}

      {cards.length > 0 && (
        <div className="grid gap-5 grid-cols-12 max-w-3xl p-5 border-input shadow-xs rounded-xl bg-accent">
          {cards.map((card, index) => (
            <article
              key={`${card.title}-${index}`}
              className="rounded-xl border border-muted odd:col-span-8 odd:col-start-5 even:col-span-8 p-5 shadow-xs relative"
            >
              <div className="mb-4 flex items-center gap-3 absolute -top-5 -left-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>

                <h2 className="font-semibold leading-tight">
                  {card.title}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>

              <ul className="mt-4 space-y-2">
                {card.points.map((point, pointIndex) => (
                  <li
                    key={`${point}-${pointIndex}`}
                    className="flex gap-2 text-sm"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}