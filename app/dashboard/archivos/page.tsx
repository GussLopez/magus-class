import CreateFile from "@/src/features/files/components/CreateFile"
import CreateFolder from "@/src/features/files/components/CreateFolder";
import RecentFiles from "@/src/features/files/components/RecentFiles";
import TableFiles from "@/src/features/files/components/TableFiles";

export default function ArchivosPage() {

  return (
    <main>
      <div className="grid grid-cols-4 gap-5">
        <CreateFile />
        <CreateFolder />
      </div>
      <RecentFiles />

      <TableFiles />
    </main>
  )
}
