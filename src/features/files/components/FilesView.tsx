'use client'
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"
import { Grid2X2, ListFilter, Search, TextAlignJustify } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTab } from "@/src/shared/components/ui/tabs"
import { Input } from "@/src/shared/components/ui/input"
import { File } from "@/src/shared/types/file.types";
import TableFiles from "./TableFiles";
import FileCard from "./FileCard";
import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function FilesView() {
  const supabase = getSupabaseBrowserClient();

  const fetchAllFiles = async () => {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Error fetching');

    return res.json();
  }

  const { data, isLoading, error } = useQuery<File[]>({
    queryKey: ["user-files"],
    queryFn: fetchAllFiles,
    retry: 1
  });

  return (
    <Tabs defaultValue={'card'} className="mt-8">
      <h2 className="font-medium">Todos los archivos</h2>
      <div className="flex justify-between mt-3">
        <div>
          <TabsList>
            <TabsTab value={'card'}><Grid2X2 /></TabsTab>
            <TabsTab value={'table'}><TextAlignJustify /></TabsTab>
          </TabsList>
        </div>

        <div className="flex gap-3 max-h-10 overflow-hidden">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-2 text-input" />
            <Input className="h-full py-0 pl-10 border" />
          </div>

          <Button variant={'outline'}>
            <ListFilter />
            Filtros
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <TabsContent value={'card'}>
          <div className="grid grid-cols-4 gap-5">
            {data?.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
            {isLoading && [...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-full h-47.5" />
          ))}
          </div>
        </TabsContent>
        <TabsContent value={'table'}>
          {data && <TableFiles data={data} />}
        </TabsContent>
      </div>
    </Tabs>
  )
}
