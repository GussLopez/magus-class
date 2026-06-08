'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/components/ui/avatar";
import { Button } from "@/src/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu";
import { useUserStore } from "@/src/shared/store/UserStore";
import { getSupabaseBrowserClient } from "@/src/shared/supabase/browser-client";
import { ChevronsUpDown, HelpCircle, LogOut, Moon, Settings, Sun, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";

export default function ProfileDropdown() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const user = useUserStore();
  const { theme, setTheme } = useTheme();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      sileo.error({
        title: 'Error al cerrar la sesión',
        description: 'Ocurrió un error al cerrar la sesión, por favor intenta más tarde'
      });
      return;
    }

    router.push('/auth/login');
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="gap-5"
          size={'sm'}
        >
          <div className="flex items-center gap-1.5">
            <Avatar className="size-5">
              <AvatarImage src={user.avatar_url!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </div>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-62">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <Avatar className="size-8">
            <AvatarImage src={user.avatar_url!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-foreground">{user.name}</span>
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={'/dashboard/perfil'}>
              <UserCircle2 />
              Perfil
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings />
            Configuración
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle />
            Ayuda
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
            Camibar Tema
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
