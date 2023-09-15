"use client";

import DeleteApp from "@/components/dialogs/delete-app";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import getAppInfo from "@/hooks/react-query/get-app-info";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";

export default function Settings() {
  const { data } = getAppInfo();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DashboardLayout>
      {mounted ? (
        <>
          <div className="flex items-center justify-between">
            <h3>Created</h3>
            <span>
              {data?.createdAt &&
                formatDistanceToNowStrict(new Date(data?.createdAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
          <div className="mt-5 w-full bg-red-500/40 border border-red-700 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-red-600 font-semibold">Delete App</h3>
              <DeleteApp />
            </div>
            <p className="text-sm">Permanently delete this app</p>
          </div>
        </>
      ) : null}
    </DashboardLayout>
  );
}
