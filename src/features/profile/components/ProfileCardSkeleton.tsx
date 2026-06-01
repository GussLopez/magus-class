import { Skeleton } from "@/src/shared/components/ui/skeleton";

export default function ProfileCardSkeleton() {

  return (
    <div className="w-full p-5 mt-5 border border-muted shadow-xs rounded-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Skeleton className="size-16 rounded-full" />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-6 w-30" />
          </div>
          <Skeleton className="w-30 h-2.5 mt-2" />
        </div>
      </div>
    </div>
  )
}
