"use client";

import FullChart from "@/components/FullChart";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import getAppInfo from "@/hooks/react-query/get-app-info";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import CountUp from "react-countup";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = getAppInfo();

  return (
    <DashboardLayout>
      <div className="w-full bg-[#212121] rounded-md py-8">
        <div className="w-full h-[200px]">
          <FullChart />
        </div>
      </div>
      <div className="mt-8 flex items-center flex-wrap gap-x-5">
        <div className="bg-[#212121] p-3 h-[150px] flex flex-col justify-between rounded-md w-11/12 sm:w-[300px] md:w-[350px] flex-1">
          <div className="space-y-2">
            <span className="text-xl">
              <CountUp end={data?.totalDecrypts ?? 0} duration={1.5} />
            </span>
            <h3 className="font-semibold text-lg">Total Decrypts</h3>
          </div>
          <div className="flex justify-end mr-3 mb-2">
            <Link
              href={`/panel/${params.id}/logs?event=decrypt`}
              className="inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition-all ease-in-out rounded-full py-1 px-3 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300"
            >
              View Logs
            </Link>
          </div>
        </div>
        <div className="bg-[#212121] p-3 h-[150px] flex flex-col justify-between rounded-md w-11/12 sm:w-[300px] md:w-[350px] flex-1">
          <div className="space-y-2">
            <span className="text-xl">
              <CountUp end={data?.totalEncrypts ?? 0} duration={1.5} />
            </span>
            <h3 className="font-semibold text-lg">Total Encrypts</h3>
          </div>
          <div className="flex justify-end mr-3 mb-2">
            <Link
              href={`/panel/${params.id}/logs?event=encrypt`}
              className="inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition-all ease-in-out rounded-full py-1 px-3 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300"
            >
              View Logs
            </Link>
          </div>
        </div>
        <div className="bg-[#212121] p-3 h-[150px] flex flex-col justify-between rounded-md w-11/12 sm:w-[300px] md:w-[350px] flex-1">
          <div className="space-y-2">
            <span className="text-xl">
              {data?.createdAt &&
                formatDistanceToNowStrict(new Date(data?.createdAt), {
                  addSuffix: true,
                })}
            </span>
            <h3 className="font-semibold text-lg">Created App</h3>
          </div>
          <div className="flex justify-end mr-3 mb-2">
            <Link
              href={`/panel/${params.id}/settings`}
              className="inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition-all ease-in-out rounded-full py-1 px-3 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300"
            >
              Manage App
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
