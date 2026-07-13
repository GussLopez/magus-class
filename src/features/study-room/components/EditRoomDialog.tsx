"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog";
import { useState } from "react";

interface Props {
  sala: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditRoomDialog({
  sala,
  setOpen,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [nombre, setNombre] = useState(sala.name);
  const [descripcion, setDescripcion] = useState(
    sala.description ?? ""
  );

  const eliminarSala = async () => {

    const confirmar = confirm(
      "¿Seguro que deseas eliminar esta sala?\n\nEsta acción no se puede deshacer."
    );

    if (!confirmar) return;

    const res = await fetch(`/api/salas/${sala.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Sala eliminada correctamente");

    window.location.href = "/dashboard/salas";
  };

  const guardar = async () => {
    const res = await fetch(`/api/salas/${sala.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
      }),
    });


    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    onUpdated();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Sala</DialogTitle>
        </DialogHeader>

        <div>

          <input
            className="border rounded w-full p-3 mb-4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />

          <textarea
            className="border rounded w-full p-3 h-32"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="border rounded px-4 py-2"
            >
              Cancelar
            </button>

            <button
              onClick={guardar}
              className="bg-blue-600 text-white rounded px-4 py-2"
            >
              Guardar
            </button>
            <button
              onClick={eliminarSala}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
            >
              Eliminar Sala
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}