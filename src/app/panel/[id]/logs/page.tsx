"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getAppLogs from "@/hooks/react-query/get-app-logs";
import { GLOBE_ICON, NODEJS_ICON, TOAST_STYLE } from "@/utils/constants";
import clsx from "clsx";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { getCode } from "country-list";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import CountUp from "react-countup";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Skeleton } from "@/components/ui/skeleton";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ghost, RotateCcw } from "lucide-react";

interface Log {
  createdAt: string;
  id: string;
  eventType: string;
  ipAddress: string;
  location: string;
  city: string;
  SDK: string;
  byteLength: number;
}

const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied!", { style: TOAST_STYLE });
};

export default function Logs({ params }: { params: { id: string } }) {
  const { mutate, data, isLoading, isSuccess } = getAppLogs();
  const [logs, setLogs] = useState<Array<Log> | undefined>([]);
  const [page, setPage] = useState<number>(1);

  const getSDKIcon = (sdkName: string) => {
    const sdks = [
      {
        name: "NODEJS_SDK",
        icon: NODEJS_ICON,
        label: "NodeJS",
        color: "#339933",
      },
      {
        name: "WEB_PLATFORM",
        icon: GLOBE_ICON,
        label: "Web UI",
        color: "#05BAF4",
      },
    ];

    const sdk = sdks.find((sdk) => sdkName === sdk.name) || sdks[0];

    return (
      <div
        style={{ backgroundColor: sdk.color }}
        className={clsx(
          sdk.color,
          "h-6 w-6 flex items-center justify-center rounded-full"
        )}
        title={sdk.label}
      >
        {sdk.icon}
      </div>
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setLogs((prev) => [...(prev ?? []), ...data.logs]);
    }
  }, [isSuccess]);

  useEffect(() => {
    mutate({ page });
  }, []);

  const handleRefetchWithPage = () => {
    setPage(page + 1);
    mutate({ page: page + 1 });
  };

  return (
    <DashboardLayout>
      <Toaster position="bottom-center" />
      {isLoading ? (
        <>
          <Skeleton className="w-full h-[50px] mt-2" />
          <Skeleton className="w-full h-[50px] mt-2" />
          <Skeleton className="w-full h-[50px] mt-2" />
          <Skeleton className="w-full h-[50px] mt-2" />
          <Skeleton className="w-full h-[50px] mt-2" />
        </>
      ) : (
        <>
          {!logs || logs.length === 0 ? (
            <div className="flex items-center flex-col">
              <Ghost className="w-5 h-5" />
              <h3 className="mt-2 font-semibold text-xl sm:text-2xl">
                Pretty empty around here
              </h3>
              <p className="mt-1 font-light">Use your keys to get started</p>
            </div>
          ) : (
            <>
              <div className="w-full flex items-center justify-between">
                <div>
                  <h3 className="text-xl">
                    <CountUp end={data?.totalCount} /> Events
                  </h3>
                  <span className="md:block hidden text-foreground/50 text-sm">
                    right click for more options
                  </span>
                </div>
                <Button
                  onClick={() => mutate({ page })}
                  className="inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition-all ease-in-out rounded-full py-1 px-3 bg-zinc-800/40 text-zinc-400 ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800 hover:text-zinc-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refetch
                </Button>
              </div>
              <Accordion type="multiple" className="w-full md:hidden">
                {logs?.map((log: Log, index: number) => (
                  <AccordionItem value={log?.createdAt} key={`logs-${index}`}>
                    <AccordionTrigger>
                      {formatDistanceToNow(new Date(log?.createdAt), {
                        addSuffix: true,
                      })}{" "}
                      - {log?.eventType}
                    </AccordionTrigger>
                    <AccordionContent>
                      <span>Log ID: {log?.id}</span>
                      <div className="w-full h-[1px] bg-zinc-600 my-2"></div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span>SDK:</span>
                            <div className="flex items-center ml-2">
                              {getSDKIcon(log?.SDK)}{" "}
                              <span className="ml-1">{log?.SDK}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span>Bytes:</span>
                            <div className="flex items-center ml-2">
                              {log?.byteLength} B
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span>IP Address:</span>
                            <div className="flex items-center ml-2">
                              {log?.ipAddress}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mt-2">
                            <span>Event:</span>
                            <div className="flex items-center ml-2">
                              {log?.eventType}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span>Location:</span>
                            <div className="flex items-center gap-2 ml-2">
                              <span>{log?.city}</span>
                              <span>{getCode(log?.location)}</span>
                              <span>
                                {getUnicodeFlagIcon(
                                  getCode(log?.location) || "Not Found"
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span>Timestamp:</span>
                            <span>{log?.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="hidden md:block mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SDK</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Bytes</TableHead>
                      <TableHead className="text-left">Location</TableHead>
                      <TableHead className="text-right">IP Address</TableHead>
                      <TableHead className="text-right">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.logs.map((log: Log, index: number) => (
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <TableRow key={index}>
                            <TableCell>{getSDKIcon(log?.SDK)}</TableCell>
                            <TableCell>
                              {log?.eventType.toLowerCase()}
                            </TableCell>
                            <TableCell>{log?.byteLength}</TableCell>
                            <TableCell className="flex gap-2" align="left">
                              <span>{log?.city}</span>
                              <span>{getCode(log?.location)}</span>
                              <span>
                                {getUnicodeFlagIcon(
                                  getCode(log?.location) || "Not Found"
                                )}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              {log?.ipAddress}
                            </TableCell>
                            <TableCell align="right">
                              {formatDistanceToNowStrict(
                                new Date(log?.createdAt),
                                { addSuffix: true }
                              )}
                            </TableCell>
                          </TableRow>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem onClick={() => copyText(log?.id)}>
                            Copy Log ID
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={() => copyText(log?.createdAt)}
                          >
                            Copy Timestamp
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {logs && logs.length !== 0 ? (
            <div className="w-full my-24 flex items-center justify-center">
              <Button
                disabled={data?.totalPages === page}
                variant="outline"
                onClick={handleRefetchWithPage}
              >
                Load More
              </Button>
            </div>
          ) : null}
        </>
      )}
    </DashboardLayout>
  );
}
