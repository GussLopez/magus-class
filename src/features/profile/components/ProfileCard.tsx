'use client';
import { useUserStore } from "@/src/shared/store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { ProfileData } from "../types/profile.types";
import { Calendar, ImageUp, PencilLineIcon } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from 'motion/react'

export default function ProfileCard() {
  const userId = useUserStore(state => state.id);
  const [isHover, setIsHover] = useState(false);

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
        <div className="relative cursor-pointer">
          <motion.div
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            className="h-16 w-16 overflow-hidden rounded-full relative flex justify-center items-center bg-accent"
          >
            <Image
              src={data?.avatar_url!}
              alt="Avatar del usuario"
              width={70}
              height={70}
              className={`object-cover transition-all duration-200 ${isHover ? "blur-[2px] brightness-65" : ""
                }`}
            />
            <AnimatePresence mode="wait">
              {isHover && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-10 flex justify-center items-center"
                >
                  <ImageUp size={28} className="text-white drop-shadow-md" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
