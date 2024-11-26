import { Skeleton } from '@/components/ui/skeleton';

export default function CommentSkeleton() {
  return (
    <div className="space-y-5 mt-8">
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
    </div>
  );
}
