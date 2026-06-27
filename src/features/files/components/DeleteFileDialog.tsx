import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/shared/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/src/shared/components/ui/dropdown-menu";
import { Spinner } from "@/src/shared/components/ui/spinner";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { sileo } from "sileo";

interface DialogProps {
  documentId: string;
}

export default function DeleteFileDialog({ documentId }: DialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const supabase = getSupabaseBrowserClient();


  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (!res.ok) {
        throw new Error('Error al eliminar el documento');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-files"] });
      sileo.success({ title: 'Archvio eliminado correctamente' })
      setOpen(false);
    }
  })

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <Trash2 />
        Eliminar
      </DropdownMenuItem>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás completamente seguro?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente tu
              archivo de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                mutate();
              }}
            >
              {isPending ? (
                <>
                  <Spinner />
                  Eliminando
                </>
              ) : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
