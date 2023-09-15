import { TOAST_STYLE } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function getAppInfo() {
  const params = useParams();
  return useQuery({
    queryKey: ["dataRepo"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/apps/${params.id}`);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(
          err.response?.data ||
            "Something went wrong while fetchin app details",
          { style: TOAST_STYLE }
        );
      }

      toast.error("Someting went wrong! Please try again later.", {
        style: TOAST_STYLE,
      });
    },
  });
}
