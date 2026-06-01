'use client'

import { Avatar, AvatarImage } from "@/src/shared/components/ui/avatar"
import { useUserStore } from "@/src/shared/store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { ProfileData } from "../types/profile.types";
import { Calendar, ImagePlus, Pencil, PencilLineIcon } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";

export default function ProfileCard() {
  const userId = useUserStore(state => state.id);
  const { data, isLoading } = useQuery<ProfileData>({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const res = await fetch(`/api/profiles/${userId}`)

      if (!res.ok) throw new Error('Error al obtener la información del perfil');

      return res.json();
    },
    enabled: !!userId
  });
  const joinedDate = data?.created_at
    ? new Intl.DateTimeFormat("es-MX", {
      month: "long",
      year: "numeric",
    }).format(new Date(data.created_at))
    : "";
  return (
    <div className="w-full p-5 mt-5 border border-muted shadow-xs">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="size-16 hover:blur-xs">
            <AvatarImage src={data?.avatar_url} />
          </Avatar>
          
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{data?.name}</span>
            <Button
              variant={'outline'}
              size={'sm'}
            >
              <PencilLineIcon />
              Editar Perfil
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <span>Se unió el {joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
