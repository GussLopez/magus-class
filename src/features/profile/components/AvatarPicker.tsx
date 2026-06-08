'use client'

import Image from "next/image";
import { AnimatePresence, motion } from 'motion/react';
import { useState } from "react";
import { ImageUp } from "lucide-react";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/src/shared/components/ui/popover";
import { useUserStore } from "@/src/shared/store/UserStore";
import { sileo } from "sileo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const avatars = [
  '/img/avatar/robot.png',
  '/img/avatar/robot-2.png',
  '/img/avatar/leon.png',
  '/img/avatar/armadillo.png',
  '/img/avatar/macaw.png',
  '/img/avatar/jaguar.png',
  '/img/avatar/chicken.png',
  '/img/avatar/panda-bear.png',
  '/img/avatar/pelican.png',
]

export default function AvatarPicker({ userImg }: { userImg: string }) {
  const [isHover, setIsHover] = useState(false);
  const userId = useUserStore(state => state.id);
  const setAvatar = useUserStore(state => state.setAvatar)
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (img: string) => {
      const res = await fetch(`/api/profiles/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ avatar_url: img })
      });

      if (!res.ok) throw new Error('Error al cambiar el avatar');

      setAvatar(img);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      sileo.success({
        title: 'Avatar guardado',
        description: 'El avatar se guardó correctamente',
        autopilot: false
      })
    },
    onError: () => {
      sileo.error({
        title: 'Error al cambiar el avatar',
        description: 'Ocurrió un error al cambiar el avatar, por favor itenta más tarde'
      })
    }
  })
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <motion.div
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            className="h-16 w-16 overflow-hidden rounded-full relative flex justify-center items-center bg-accent"
          >
            <Image
              src={userImg}
              alt="Avatar del usuario"
              width={70}
              height={70}
              className={
                `object-cover transition-all duration-200 ${isHover ? "blur-[2px] brightness-65" : ""}`
              }
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
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Selecciona tu avatar</PopoverTitle>
        </PopoverHeader>
        <div className="grid grid-cols-3 gap-5 p-2">
          {avatars.map((img, i) => (
            <div
              key={i}
              className={`rounded-full ${img === userImg ? 'ring-4 ring-primary/80' : 'hover:ring-4 hover:ring-primary/80'} transition-all`}
              onClick={() => mutate(img)}
            >
              <Image
                src={img}
                alt="Avatares disponibles"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
