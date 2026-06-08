import ProfileCard from "@/src/features/profile/components/ProfileCard";
import { Button } from "@/src/shared/components/ui/button";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Mi cuenta</h1>
      <ProfileCard />
      <div className="mt-3">
        <Button
          size={'sm'}
          variant={'destructive'}
        >Eliminar Cuenta</Button>
      </div>
    </div>
  )
}
