'use client'

import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/components/ui/table"
import { EllipsisVertical, ExternalLink, FilePen } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import DeleteFileDialog from "./DeleteFileDialog"
import { File } from "@/src/shared/types/file.types";
import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";

export default function TableFiles() {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del archivo</TableHead>
          <TableHead>Subido por</TableHead>
          <TableHead>Ult. Modificado</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="flex items-center gap-5">
              <div className="">
                <PDFIlustration className="size-8" />
              </div>
              <div>
                <p className="font-medium">{file.title}</p>
                <span className="text-xs text-muted-foreground">220 KB docx</span>
              </div>
            </TableCell>
            <TableCell>{file.file_name}</TableCell>
            <TableCell>{file.created_at}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={'icon'}
                    variant={'ghost'}
                  >
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <FilePen />
                      Renombrar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink />
                      Abrir en el navegador
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DeleteFileDialog
                    documentId={file.id}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
