import CreateFile from "@/src/features/files/components/CreateFile"
import CreateFolder from "@/src/features/files/components/CreateFolder";
import FilesView from "@/src/features/files/components/FilesView";

export default function ArchivosPage() {

  return (
    <main>
      <div className="grid grid-cols-4 gap-5">
        <CreateFile />
        <CreateFolder />
      </div>
      {/* <RecentFiles /> */}

      <FilesView />
    </main>
  )
}
