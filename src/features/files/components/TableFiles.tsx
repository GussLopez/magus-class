'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/components/ui/table"
import { EllipsisVertical, ExternalLink, FilePen } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import DeleteFileDialog from "./DeleteFileDialog"
import { File } from "@/src/shared/types/file.types";
import { PDFIlustration } from "@/src/shared/components/icons/PdfIlustration";
import { formatFileSize } from "../utils/formatSize";
import { formatDate } from "@/src/shared/lib/utils";

interface TableFilesProps {
  data: File[]
}

export default function TableFiles({ data }: TableFilesProps) {
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
              <div>
                <PDFIlustration className="size-8" />
              </div>
              <div>
                <p className="font-medium">{file.title}</p>
                <span className="text-xs text-muted-foreground">{formatFileSize(file.file_size_bytes)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>{file.user.name}</p>
                <span className="text-xs text-muted-foreground">{file.user.email}</span>
              </div>
            </TableCell>
            <TableCell>{formatDate(file.created_at)}</TableCell>
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
