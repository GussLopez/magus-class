'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/components/ui/avatar";
import { Button } from "@/src/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/shared/components/ui/table";
import { useUserStore } from "@/src/shared/store/UserStore";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { File } from "@/src/shared/types/file.types";
import { useQuery } from "@tanstack/react-query";
import { FileText, Paperclip } from "lucide-react";

export default function SelectFileDialog() {
  const supabase = getSupabaseBrowserClient();
  const user = useUserStore(state => state);
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

  const { data, isLoading } = useQuery<File[]>({
    queryKey: ["user-files"],
    queryFn: fetchAllFiles,
    retry: 1,
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          type="button"
          className="bg-muted hover:bg-muted! text-muted-foreground cursor-pointer"
        >
          <Paperclip className="size-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Selecciona un archivo</DialogTitle>
        </DialogHeader>
        <div>
          <Table>
            <TableHeader className="hover:bg-white">
              <TableRow className="hover:bg-white">
                <TableHead>Nombre del archivo</TableHead>
                <TableHead>Subido por</TableHead>
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
                      <span className="text-xs text-muted-foreground">220 KB {file.file_type === 'application/pdf' && 'PDF'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      {user.avatar_url && (
                        <Avatar className="size-7">
                          <AvatarImage
                            src={user.avatar_url}
                            alt="Avatar del usuario"
                          />
                          <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="leading-3">
                        <p className="font-medium">{user.name}</p>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
