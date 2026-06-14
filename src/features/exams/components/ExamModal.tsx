'use client'

import { useState } from "react";
import useTimer from "../hooks/useTime";
import { Exam } from "../types/exam.types";
import { cn } from "@/src/shared/lib/utils";
import { Clock, Trophy, CheckCircle2, XCircle, Target, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";

export default function ExamModal({
  exam,
  open,
  setOpen,
  onComplete,
}: {
  exam: Exam;
  open: boolean,
  setOpen: (open: boolean) => void;
  onComplete: (score: number, time: string, answers: Record<string, number>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(
    exam.userAnswers || {}
  );
  const { formatTime } = useTimer(!exam.completed);
  const [isReviewing] = useState(exam.completed);

  const allAnswered = exam.questions.every((q) => answers[q.id] !== undefined);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isReviewing) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleFinish = () => {
    if (!allAnswered) return;
    const score = exam.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
    onComplete(score, formatTime(), answers);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{exam.title}</DialogTitle>
          <DialogDescription className="text-sm text-blue-100/60 mt-1">
            {exam.questions.length} preguntas • {exam.pdfSource}
          </DialogDescription>


          {!isReviewing && (
            <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-xl border border-blue-500/30">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="font-mono text-lg text-white">{formatTime()}</span>
            </div>
          )}
          {isReviewing && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-xl border border-green-500/30">
                <Trophy className="h-5 w-5 text-green-400" />
                <span className="text-white">
                  {exam.score}/{exam.totalQuestions} (
                  {Math.round((exam.score! / exam.totalQuestions!) * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-xl border border-blue-500/30">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-white">{exam.completionTime}</span>
              </div>
            </div>
          )}
        </DialogHeader>
        <div className="no-scrollbar max-h-[50vh] overflow-y-auto">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {exam.questions.map((question, qIndex) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className={cn(
                    "rounded-2xl border p-6 transition-all",
                    isReviewing
                      ? isCorrect
                        ? "border-green-500/30 bg-green-600/10"
                        : "border-red-500/30 bg-red-600/10"
                      : "border-white/10 bg-white/5"
                  )}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                        isReviewing
                          ? isCorrect
                            ? "bg-green-600/30 text-green-300"
                            : "bg-red-600/30 text-red-300"
                          : "bg-blue-600/30 text-blue-300"
                      )}
                    >
                      {qIndex + 1}
                    </span>
                    <p className="text-lg text-white font-medium">
                      {question.question}
                    </p>
                  </div>

                  <div className="space-y-3 ml-12">
                    {question.options.map((option, oIndex) => {
                      const isSelected = userAnswer === oIndex;
                      const isCorrectOption = question.correctAnswer === oIndex;

                      let optionStyles = "border-white/10 bg-white/5 hover:bg-white/10";

                      if (isReviewing) {
                        if (isCorrectOption) {
                          optionStyles = "border-green-500/50 bg-green-600/20";
                        } else if (isSelected && !isCorrectOption) {
                          optionStyles = "border-red-500/50 bg-red-600/20";
                        } else {
                          optionStyles = "border-white/10 bg-white/5 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyles = "border-blue-500/50 bg-blue-600/20";
                      }

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleSelectAnswer(question.id, oIndex)}
                          disabled={isReviewing}
                          className={cn(
                            "w-full text-left rounded-xl border p-4 transition-all flex items-center gap-3",
                            optionStyles,
                            !isReviewing && "cursor-pointer"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                              isReviewing && isCorrectOption
                                ? "border-green-400 text-green-400"
                                : isReviewing && isSelected && !isCorrectOption
                                  ? "border-red-400 text-red-400"
                                  : isSelected
                                    ? "border-blue-400 text-blue-400 bg-blue-600/30"
                                    : "border-white/30 text-white/60"
                            )}
                          >
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          <span
                            className={cn(
                              "text-sm",
                              isReviewing && isCorrectOption
                                ? "text-green-300 font-medium"
                                : isReviewing && isSelected && !isCorrectOption
                                  ? "text-red-300"
                                  : "text-white"
                            )}
                          >
                            {option}
                          </span>
                          {isReviewing && isCorrectOption && (
                            <CheckCircle2 className="ml-auto h-5 w-5 text-green-400" />
                          )}
                          {isReviewing && isSelected && !isCorrectOption && (
                            <XCircle className="ml-auto h-5 w-5 text-red-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter className="flex items-center gap-5 justify-between p-6 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-sm text-blue-100/60">
            <Target className="h-4 w-4" />
            <span>
              {Object.keys(answers).length}/{exam.questions.length} respondidas
            </span>
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                onClick={() => setOpen(false)}
                variant={'outline'}
              >
                <X className="h-4 w-4" />
                Cerrar
              </Button>
            </DialogClose>
            <Button
              onClick={handleFinish}
              disabled={!allAnswered}
            >
              <CheckCircle2 className="h-4 w-4" />
              Finalizar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}