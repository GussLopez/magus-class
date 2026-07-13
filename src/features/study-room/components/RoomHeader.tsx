"use client";

import { Copy, Pencil, Trash2 } from "lucide-react";

interface Props {
  room: any;
  isOwner: boolean;
}

export default function RoomHeader({ room, isOwner }: Props) {
  async function copiarCodigo() {
    await navigator.clipboard.writeText(room.code);

    alert("Código copiado");
  }

  return (
    <div className="border rounded-2xl p-6 bg-card">

      <div className="flex justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            {room.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            Código:
            <strong className="ml-2">
              {room.code}
            </strong>
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={copiarCodigo}
            className="px-4 py-2 rounded-lg border flex items-center gap-2"
          >
            <Copy size={18}/>
            Copiar
          </button>

          {isOwner && (

            <>
    
            </>

          )}

        </div>

      </div>

    </div>
  );
}