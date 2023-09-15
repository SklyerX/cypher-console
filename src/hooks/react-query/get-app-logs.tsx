import { TOAST_STYLE } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function getAppLogs() {
  const { id } = useParams();
  return useMutation({
    mutationKey: ["logsRepo"],
    mutationFn: async ({ page }: { page: number }) => {
      const { data } = await axios.get(
        `/api/apps/${id}/logs?page=${page}&per_page=25`
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(
          err.response?.data || "Something went wrong while fetching app logs!",
          {
            style: TOAST_STYLE,
          }
        );
      }
      return toast.error("Something went wrong while fetching app logs!", {
        style: TOAST_STYLE,
      });
    },
  });
}
