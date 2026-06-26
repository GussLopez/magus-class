'use client'

import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"
import { File } from "../files.types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/components/ui/table"
import { FileText } from "lucide-react"

export default function TableFiles() {
  const supabase = getSupabaseBrowserClient()

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

  console.log(data);
  return (
    <div className="mt-8">
      <h2 className="font-medium">Todos los archivos</h2>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del archivo</TableHead>
              <TableHead>Subido por</TableHead>
              <TableHead>Ult. Modificado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="flex items-center gap-5">
                  <div className="w-fit p-2 rounded-md bg-muted">
                    <FileText className="size-4.5"/>
                  </div>
                  {file.title}
                </TableCell>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>{file.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
