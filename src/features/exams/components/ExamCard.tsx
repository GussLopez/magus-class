import { cn } from "@/src/shared/lib/utils";
import { Exam } from "../types/exam.types";
import { CheckCircle2, ChevronRight, Clock, FileText, Trophy } from "lucide-react";

export default function ExamCard({
  exam,
  onClick,
}: {
  exam: Exam;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl border border-input p-6 transition-all hover:border-primary hover:bg-input/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              exam.completed
                ? "bg-green-600/20 border border-green-500/30"
                : "bg-blue-600/20 border border-blue-500/30"
            )}
          >
            {exam.completed ? (
              <CheckCircle2 className="h-7 w-7 text-green-400" />
            ) : (
              <FileText className="h-7 w-7 text-blue-400" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold ">
              {exam.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{exam.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              📄 {exam.pdfSource} • {exam.questions.length} preguntas
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-400 transition-colors" />
      </div>

      {exam.completed && (
        <div className="mt-4 flex items-center gap-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-blue-100/80">
              {exam.score}/{exam.totalQuestions} correctas (
              {Math.round((exam.score! / exam.totalQuestions!) * 100)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-100/80">{exam.completionTime}</span>
          </div>
        </div>
      )}
    </button>
  );
}