import { TOAST_STYLE } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function getUserApps() {
  return useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["appsRepo"],
    queryFn: async () => {
      const { data } = await axios.get("/api/apps/");
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(
          err.response?.data || "Something went wrong while fetching apps!",
          {
            style: TOAST_STYLE,
          }
        );
      }
      return toast.error("Something went wrong while fetching apps!", {
        style: TOAST_STYLE,
      });
    },
  });
}
