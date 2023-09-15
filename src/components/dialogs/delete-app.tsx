import deleteApp from "@/hooks/react-query/delete-app";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function DeleteApp() {
  const { isLoading, mutate, isSuccess } = deleteApp();
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      redirect("/panel");
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={opened}
      onOpenChange={(e) => {
        if (isLoading) return;
        setOpened(e);
      }}
    >
      <DialogTrigger>
        <button className="text-sm">
          <span>Delete</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete App</DialogTitle>
          <DialogDescription>Permanently delete this App</DialogDescription>
        </DialogHeader>
        <div>
          <div className="mt-2 w-full bg-orange-600/40 border border-orange-700 flex gap-x-3 p-4 rounded-md">
            <AlertTriangle className="w-10 h-10" />
            <p className="text-sm">
              Warning: This will revoke your current app keys. Your application
              won't be able to decrypt data using the current keys.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            isLoading={isLoading}
            onClick={() => mutate()}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
