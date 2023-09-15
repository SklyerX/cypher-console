"use client";

import AppCard from "@/components/AppCard";
import CreateAppDialog from "@/components/dialogs/create-app";
import AppCardSkeleton from "@/components/skeletons/AppCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import getUserApps from "@/hooks/react-query/get-user-apps";
import { AppProps } from "@/types";
import { Ghost } from "lucide-react";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Panel() {
  const { data, refetch, isLoading, isRefetching } = getUserApps();
  const session = getSession();

  if (!session) return redirect("/");

  return (
    <div>
      <Toaster position="bottom-center" />
      {isLoading || isRefetching ? (
        <>
          <div className="max-w-[1120px] flex flex-row items-center justify-between mx-auto mb-5">
            <Skeleton className="w-[200px] h-[35px]" />
            <Skeleton className="w-[76px] h-[46px]" />
          </div>
          <div className="flex items-center flex-wrap gap-5 justify-center">
            {Array(5)
              .fill(true)
              .map((_, index) => (
                <AppCardSkeleton key={index} />
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[1120px] flex flex-row items-center justify-between mx-auto mb-5">
            <h3 className="ml-4 sm:ml-0 font-semibold">Apps</h3>
            <CreateAppDialog onChange={() => refetch()} />
          </div>
          <div className="flex items-center flex-wrap gap-5 justify-center">
            {data?.apps.map((app: AppProps, index: number) => (
              <AppCard app={app} key={index} events={app.totalEvents} />
            ))}
            {!data?.apps || data.apps.length === 0 ? (
              <div className="flex items-center flex-col">
                <Ghost className="w-5 h-5" />
                <h3 className="mt-2 font-semibold text-xl sm:text-2xl">
                  Pretty empty around here
                </h3>
                <p className="mt-1 font-light">Let's create your first app</p>
              </div>
            ) : null}
          </div>
        </>
      )}
      {/* button to loadmore */}
    </div>
  );
}
