"use client";

import createNewApp from "@/hooks/react-query/create-new-app";
import { AppCredentials, AppValidator } from "@/lib/validators/app";
import { TOAST_STYLE } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Copy } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface Props {
  onChange: () => void;
}

const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied", { style: TOAST_STYLE });
};

export default function CreateAppDialog({ onChange }: Props) {
  const { mutate, data, isLoading, isSuccess } = createNewApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppCredentials>({
    resolver: zodResolver(AppValidator),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: AppCredentials) => {
    mutate({ name: data.name });
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        if (e === false && isSuccess) onChange();
      }}
    >
      <DialogTrigger className="mr-3" asChild>
        <Button size="default">Create</Button>
      </DialogTrigger>
      <DialogContent className="overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create new app</DialogTitle>
          <DialogDescription>
            You are about to create a new app. What are apps? apps are just a
            way for you to track your key usages and get safe encryption keys
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="max-w-fit overflow-x-scroll">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm">APP ID</h3>
              <Copy
                className="w-4 h-4 cursor-pointer"
                onClick={() => copyText(data.app_credentials.app_id)}
              />
            </div>
            <pre className="overflow-y-scroll bg-green-500/40 border border-green-700 rounded-md p-5">
              <code className="overflow-y-hidden">
                {data.app_credentials.app_id}
              </code>
            </pre>
            <div className="flex items-center justify-between mt-3 mb-1">
              <h3 className="text-sm">APP SECRET</h3>
              <Copy
                className="w-4 h-4 cursor-pointer"
                onClick={() => copyText(data.app_credentials.app_secret)}
              />
            </div>
            <pre className="overflow-y-scroll bg-red-500/40 border border-red-700 rounded-md p-5">
              <code className="overflow-y-hidden">
                {data.app_credentials.app_secret}
              </code>
            </pre>
            <div className="mt-2 flex items-center gap-2 bg-orange-600/40 border border-orange-800 p-2 rounded-md">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-500">
                Copy this value. You wont see it agian!
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 mb-1">
              <h3 className="text-sm">JWT SECRET</h3>
              <Copy
                className="w-4 h-4 cursor-pointer"
                onClick={() => copyText(data.app_credentials.jwt_secret)}
              />
            </div>
            <pre className="overflow-y-scroll bg-red-500/40 border border-red-700 rounded-md p-5">
              <code className="overflow-y-hidden">
                {data.app_credentials.jwt_secret}
              </code>
            </pre>
            <div className="mt-2 flex items-center gap-2 bg-amber-700/40 border border-amber-800 p-2 rounded-md">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-500">
                Copy this value. You wont see it agian!
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Name of app" {...register("name")} />
            {errors.name ? (
              <span className="text-red-500 my-2 text-xs">
                {errors.name.message}
              </span>
            ) : null}
            <DialogFooter className="mt-3">
              <Button type="submit" isLoading={isLoading}>
                Create App
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
