import { TOAST_STYLE } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function createNewApp() {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const { data } = await axios.post("/api/apps", {
        name,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully created new app", { style: TOAST_STYLE });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(
          err.response?.data ||
            "Something went wrong while creating a new app!",
          { style: TOAST_STYLE }
        );
      }

      toast.error("Someting went wrong! Please try again later.", {
        style: TOAST_STYLE,
      });
    },
  });
}
