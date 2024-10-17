import { Skeleton } from '../ui/skeleton';

export default function ArticleSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center mt-40 mb-14 space-y-3">
        <Skeleton className="h-[50px] w-[600px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="flex justify-center p-5 gap-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[650px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[80px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </>
  );
}
