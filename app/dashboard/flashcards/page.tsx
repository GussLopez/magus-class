'use client'

import { useRef, useState } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import SelectFileDialog from "@/src/features/chat/components/SelectFileDialog";
import { File } from "@/src/shared/types/file.types";
import { sileo } from "sileo";
import { Spinner } from "@/src/shared/components/ui/spinner";
import { motion } from "motion/react";
import { ScrollProgress } from "@/src/shared/components/ui/scroll-progress";
import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";

type InfographicCard = {
  title: string;
  description: string;
  points: string[];
}

export default function FlashcardPage() {
  const supabase = getSupabaseBrowserClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
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
    <main className="pb-40">
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
              disabled={loading}
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
        <div className="w-fit flex gap-4 px-3 py-2 text-sm mt-5 rounded-lg border border-input">
          <div>
            <PDFIlustration className="size-8" />
          </div>
          <div>
            <p className="font-medium">{selectedFile.title}</p>
            <p className="text-xs text-muted-foreground">
              {selectedFile.file_name}
            </p>
          </div>
        </div>
      )}
      {cards.length > 0 && (
        <div
          ref={cardsSectionRef}
          className="relative mx-auto mt-5 max-w-7xl"
        >
          <ScrollProgress target={cardsSectionRef} />

          <div className="grid grid-rows-12 gap-6 gap-y-40 rounded-xl border-input bg-accent p-5 shadow-xs">
            {cards.map((card, index) => (
              <motion.article
                key={`${card.title}-${index}`}
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                className="relative row-span-2 rounded-xl border border-muted bg-background p-5 shadow-xs odd:col-start-5"
              >
                <div className="absolute -left-3 -top-3 z-20 flex size-8 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {index + 1}
                </div>

                <div className="mb-4 flex items-center gap-3">
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
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}