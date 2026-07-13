"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import RoomHeader from "@/src/features/study-room/components/RoomHeader";
import MembersCard from "@/src/features/study-room/components/MembersCard";
import DescriptionCard from "@/src/features/study-room/components/DescriptionCard";
import QuickActions from "@/src/features/study-room/components/QuickActions";
import EditRoomDialog from "@/src/features/study-room/components/EditRoomDialog";

interface Profile {
  id: string;
  name: string;
  last_name: string | null;
  avatar_url: string | null;
  email: string;
}

interface Member {
  role: string;
  joined_at: string;
  profiles: Profile;
}

interface Room {
  id: string;
  name: string;
  code: string;
  description: string | null;
  created_at: string;
  owner: Profile;
  members: Member[];
}

export default function SalaPage() {
  const params = useParams();
  const router = useRouter();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  // Usuario autenticado
  const [myUserId, setMyUserId] = useState("");

  // Modal editar
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    cargarSala();
  }, []);

  async function cargarSala() {
    try {
      setLoading(true);

      const res = await fetch(`/api/salas/${params.id}`);

      const data = await res.json();

      console.log("Detalle sala:", data);

      if (!res.ok) {
        alert(data.error ?? "No se pudo cargar la sala");
        router.push("/dashboard/salas");
        return;
      }

      setRoom(data);

      // Cuando la API devuelva currentUserId
      if (data.currentUserId) {
        setMyUserId(data.currentUserId);
      } else {
        // Temporal
        setMyUserId(data.owner?.id ?? "");
      }
    } catch (err) {
      console.error(err);
      alert("Error al cargar la sala");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        <p>Cargando sala...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          No se encontró la sala
        </h1>
      </div>
    );
  }

  const isOwner = room.owner?.id === myUserId;

  return (
    <div className="p-8 space-y-6">

      <RoomHeader
        room={room}
        isOwner={isOwner}
      />

      {isOwner && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowEdit(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
          >
            <Pencil size={18} />
            Editar Sala
          </button>
        </div>
      )}

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 space-y-6">

          <DescriptionCard room={room} />

          <div className="border rounded-2xl p-6 bg-card">

            <h2 className="text-2xl font-bold mb-6">
              Herramientas
            </h2>

            <QuickActions />

          </div>

        </div>

        <div>

          <MembersCard
            members={room.members}
          />

        </div>

      </div>

      {showEdit && (
        <EditRoomDialog
          sala={room}
          open={showEdit}
          setOpen={setShowEdit}
          onClose={() => setShowEdit(false)}
          onUpdated={cargarSala}
        />
      )}

    </div>
  );
}