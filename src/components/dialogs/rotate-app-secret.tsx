import { AlertTriangle, Copy, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import rotateAppSecret from "@/hooks/react-query/rotate-app-secret";
import toast, { Toaster } from "react-hot-toast";
import { TOAST_STYLE } from "@/utils/constants";
import { useState } from "react";

const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied!", { style: TOAST_STYLE });
};

export default function RotateAppSecret() {
  const { mutate, data, isSuccess, isLoading } = rotateAppSecret();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <Dialog
      open={opened}
      onOpenChange={(e) => {
        if (isLoading) return;
        setOpened(e);
      }}
    >
      <Toaster position="bottom-center" />
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset App Secret</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a new app secret</DialogTitle>
          <DialogDescription>
            Generate a new app secret for this project.
          </DialogDescription>
        </DialogHeader>
        {isSuccess ? (
          <div className="max-w-fit overflow-x-scroll">
            <div className="flex items-center justify-between mt-3 mb-1">
              <h3 className="text-sm">APP SECRET</h3>
              <Copy
                className="w-4 h-4 cursor-pointer"
                onClick={() => copyText(data.app_secret)}
              />
            </div>
            <pre className="overflow-y-scroll bg-red-500/40 border border-red-700 rounded-md p-5 mt-2">
              <code className="overflow-y-hidden">{data.app_secret}</code>
            </pre>
            <div className="mt-2 flex items-center gap-2 bg-orange-600/40 border border-orange-800 p-2 rounded-md">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-500">
                Copy this value. You wont see it agian!
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-2 w-full bg-orange-600/40 border border-orange-700 flex gap-x-3 p-4 rounded-md">
              <AlertTriangle className="w-10 h-10" />
              <p className="text-sm">
                Warning: This will revoke your current app keys. Your
                application won't be able to decrypt data using the current
                keys.
              </p>
            </div>
            <DialogFooter>
              <Button
                isLoading={isLoading}
                onClick={() => mutate()}
                variant="destructive"
              >
                Reset
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
