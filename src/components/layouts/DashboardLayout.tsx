"use client";

import getAppInfo from "@/hooks/react-query/get-app-info";
import clsx from "clsx";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useParams, usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface Props {
  children: React.ReactNode | React.ReactElement;
}

export default function DashboardLayout({ children }: Props) {
  const { data, isLoading } = getAppInfo();
  const pathname = usePathname();
  const params = useParams();

  const session = getSession();

  if (!session) return redirect("/login");

  return (
    <div className="mx-auto px-7 max-w-[1200px] pt-5">
      {isLoading ? (
        <Skeleton className="h-[32px] w-[60px]" />
      ) : (
        <h3 className="text-2xl font-semibold">{data?.name}</h3>
      )}
      <div className="mt-10 flex gap-4 w-full border-b border-neutral-500/20 overflow-x-scroll">
        <Link
          href={`/panel/${params.id}`}
          className={clsx(
            "p-3 font-medium focus:outline-none hover:border-b hover:border-emerald-500",
            pathname === `/panel/${params.id}`
              ? "border-emerald-500 border-b"
              : null
          )}
        >
          Home
        </Link>
        <Link
          href={`/panel/${params.id}/logs`}
          className={clsx(
            "p-3 font-medium focus:outline-none hover:border-b hover:border-emerald-500",
            pathname === `/panel/${params.id}/logs`
              ? "border-emerald-500 border-b"
              : null
          )}
        >
          Logs
        </Link>
        <Link
          href={`/panel/${params.id}/keys`}
          className={clsx(
            "p-3 font-medium focus:outline-none hover:border-b hover:border-emerald-500",
            pathname === `/panel/${params.id}/keys`
              ? "border-emerald-500 border-b"
              : null
          )}
        >
          Keys
        </Link>
        <Link
          href={`/panel/${params.id}/settings`}
          className={clsx(
            "p-3 font-medium focus:outline-none hover:border-b hover:border-emerald-500",
            pathname === `/panel/${params.id}/settings`
              ? "border-emerald-500 border-b"
              : null
          )}
        >
          Settings
        </Link>
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
}
