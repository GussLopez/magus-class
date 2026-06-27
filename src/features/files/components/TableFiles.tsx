'use client'

import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"
import { File } from "../files.types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/components/ui/table"
import {
  EllipsisVertical,
  ExternalLink,
  FilePen,
  FileText,
  ListFilter,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/src/shared/components/ui/button"
import { Tabs, TabsList, TabsTab } from "@/src/shared/components/ui/tabs"
import { Input } from "@/src/shared/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import { useState } from "react"
import DeleteFileDialog from "./DeleteFileDialog"

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
    <div className="mt-8">
      <h2 className="font-medium">Todos los archivos</h2>
      <div className="flex justify-between mt-3">
        <div>
          <Tabs>
            <TabsList>
              <TabsTab value={'all'}>Ver todos</TabsTab>
              <TabsTab value={'documents'}>Documentos</TabsTab>
              <TabsTab value={'pdfs'}>PDFs</TabsTab>
              <TabsTab value={'others'}>Otros</TabsTab>
            </TabsList>
          </Tabs>
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
                  <div className="w-fit p-2 rounded-md bg-muted">
                    <FileText className="size-4.5" />
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
      </div>


    </div>
  )
}
