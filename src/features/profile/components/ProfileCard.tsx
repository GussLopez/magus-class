'use client';
import { useUserStore } from "@/src/shared/store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { ProfileData } from "../types/profile.types";
import { Calendar, PencilLineIcon } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import AvatarPicker from "./AvatarPicker";
import { Skeleton } from "@/src/shared/components/ui/skeleton";
import InfoItem from "./InfoItem";
import { Separator } from "@/src/shared/components/ui/separator";

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

  if (isLoading) return <ProfileCardSkeleton />
  console.log(data);
  return (
    <div className="w-full p-5 mt-5 border border-muted shadow-xs rounded-xl">
      <div className="flex items-center gap-3">
        {data?.avatar_url
          ? <AvatarPicker userImg={data?.avatar_url} />
          : <Skeleton className="size-16 rounded-full" />
        }
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
      <Separator className="w-full my-6 bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="space-y-3">
          <InfoItem
            label="Nombre"
            value={data?.name}
            isLoading={isLoading}
          />
          <InfoItem
            label="Correo"
            value={data?.email}
            isLoading={isLoading}
          />
          <InfoItem
            label="Edad"
            value={data?.age?.toString()}
            isLoading={isLoading}
          />
        </div>
        <div className="space-y-3">
          <InfoItem
            label="Apellido"
            value={data?.last_name}
            isLoading={isLoading}
          />
          <InfoItem
            label="ID de Usuario"
            value={data?.id}
            isCode
            isLoading={isLoading}
          />
          <InfoItem
            label="Sexo"
            value={data?.sex}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
