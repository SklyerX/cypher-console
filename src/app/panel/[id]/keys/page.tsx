"use client";

import RotateAppSecret from "@/components/dialogs/rotate-app-secret";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import getAppKeys from "@/hooks/react-query/get-app-keys";
import { Copy, RotateCcw } from "lucide-react";
import Link from "next/link";

const DEFAULT_APP_SECRET_PLACEHOLDER =
  "*******************************************************************************************************************************************************************************************************************************************************************************************************";

const DEFAULT_JWT_SECRET = "*******************";

export default function Keys() {
  const { data, isLoading } = getAppKeys();
  return (
    <DashboardLayout>
      <div className="grid place-items-center">
        {isLoading ? (
          <>
            <Skeleton className="w-6/12 h-[100px]" />
            <Skeleton className="w-6/12 h-[300px] mt-2" />
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs">App ID</span>
              <Copy className="w-4 h-4" />
            </div>
            <Input disabled value={data.appId} className="mt-3" />
            <div className="flex items-center justify-between mt-8">
              <span className="text-xs">App Secret</span>
              <RotateAppSecret />
            </div>
            <Input
              disabled
              value={DEFAULT_APP_SECRET_PLACEHOLDER}
              className="mt-3"
            />
            <div className="mt-3">
              <span className="text-xs">JWT Secret</span>
              <Input disabled value={DEFAULT_JWT_SECRET} className="mt-3" />
              <Link
                href="/docs/forgot-jwt"
                className="mt-1 text-xs hover:underline"
              >
                Forgot JWT Secret?
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
