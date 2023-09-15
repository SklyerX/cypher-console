import { Skeleton } from "../ui/skeleton";

export default function AppCardSkeleton() {
  return (
    <div className="w-11/12 sm:w-[400px] md:w-[500px] h-[200px] p-3 py-5 border rounded-md">
      <div className="flex items-center gap-2">
        <Skeleton className="w-[50px] h-[30px]" />
        <Skeleton className="w-[120px] h-[30px]" />
      </div>
      <Skeleton className="w-[50px] h-[15px] my-3" />
      <Skeleton className="w-full h-2/5" />
      <div className="w-full flex justify-end text-sm mt-2">
        <Skeleton className="w-[50px] h-[30px]" />
      </div>
    </div>
  );
}
