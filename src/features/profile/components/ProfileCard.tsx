'use client';
import { useUserStore } from "@/src/shared/store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { ProfileData } from "../types/profile.types";
import { Calendar, PencilLineIcon } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import AvatarPicker from "./AvatarPicker";
import { Skeleton } from "@/src/shared/components/ui/skeleton";

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
  
  return (
    <div className="w-full p-5 mt-5 border border-muted shadow-xs rounded-md">
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
    </div>
  )
}
