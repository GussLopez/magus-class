import ExamHeader from "@/src/features/exams/components/ExamHeader";
import { ExamView } from "@/src/features/exams/components/ExamView";

export default function ExamenesPage() {
  return (
    <main className="min-h-screen">
      <div className="w-full p-4">
        <ExamHeader />
        <ExamView />
      </div>
    </main>
  );
}
