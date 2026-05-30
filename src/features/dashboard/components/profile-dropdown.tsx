import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/components/ui/avatar";
import { Button } from "@/src/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu";
import { ChevronsUpDown, HelpCircle, LogOut, Settings, UserCircle2 } from "lucide-react";

export default function ProfileDropdown() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="gap-2"
          size={'sm'}
        >
          <Avatar className="size-4">
            <AvatarImage src="/img/avatar/robot.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>Username</span>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-54">
        <div className="flex items-center gap-3 px-1 py-1.5">
          <Avatar className="size-8">
            <AvatarImage src="/img/avatar/robot.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Username</span>
            <span className="text-xs text-muted-foreground">username@gmail.com</span>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircle2 />
            Perfil
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
