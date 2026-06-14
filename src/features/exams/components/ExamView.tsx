"use client"

import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Target,
} from "lucide-react";
import { Exam } from "@/src/features/exams/types/exam.types";
import { mockExams } from "@/src/features/exams/data";
import ExamCard from "@/src/features/exams/components/ExamCard";
import ExamModal from "@/src/features/exams/components/ExamModal";

export function ExamView() {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenExam = (exam: Exam) => {
    setSelectedExam(exam);
    setOpen(true);
  };

  const handleCompleteExam = (
    score: number,
    time: string,
    answers: Record<string, number>
  ) => {
    if (!selectedExam) return;

    setExams((prev) =>
      prev.map((exam) =>
        exam.id === selectedExam.id
          ? {
            ...exam,
            completed: true,
            completionTime: time,
            score,
            totalQuestions: exam.questions.length,
            userAnswers: answers,
          }
          : exam
      )
    );

    setSelectedExam((prev) =>
      prev
        ? {
          ...prev,
          completed: true,
          completionTime: time,
          score,
          totalQuestions: prev.questions.length,
          userAnswers: answers,
        }
        : null
    );
  };

  const completedCount = exams.filter((e) => e.completed).length;
  const totalQuestions = exams.reduce((acc, e) => acc + e.questions.length, 0);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-input p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{exams.length}</p>
              <p className="text-sm text-muted-foreground">Exámenes disponibles</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-input p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600/20">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {completedCount}/{exams.length}
              </p>
              <p className="text-sm text-muted-foreground">Completados</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-input p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20">
              <Target className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Preguntas totales</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Tus exámenes
        </h2>
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onClick={() => handleOpenExam(exam)}
          />
        ))}
      </div>

      {exams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-blue-600/10">
            <FileText className="h-16 w-16 text-blue-400" />
          </div>
          <h3 className="text-4xl font-bold">No hay exámenes disponibles</h3>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Los exámenes se generan automáticamente a partir de los PDFs que
            subas al sistema.
          </p>
        </div>
      )}

      {selectedExam && (
        <ExamModal
          exam={selectedExam}
          open={open}
          setOpen={setOpen}
          onComplete={handleCompleteExam}
        />
      )
      }
    </>
  );
}
