import SumConfig from "@/src/features/summaries/components/SumConfig";
import SumFont from "@/src/features/summaries/components/SumFont";
import SumHeader from "@/src/features/summaries/components/SumHeader";
import SumPreview from "@/src/features/summaries/components/SumPreview";

export default function ResumenesPage() {
  return (
    <main className="min-h-screen px-4">
      <SumHeader />
      <div className="w-full min-h-screen">
        <div className="w-full">
          <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
            <div className="space-y-6">
              <SumConfig />

              <SumFont />
            </div>

            <SumPreview />
          </div>
        </div>
      </div>
    </main>
  );
}