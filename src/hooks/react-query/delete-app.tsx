import { TOAST_STYLE } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function deleteApp() {
  const params = useParams();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/apps/${params.id}/`);
      return data;
    },
    onSuccess: () => {
      toast.success("Rotated reset app secret", { style: TOAST_STYLE });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(
          err.response?.data ||
            "Something went wrong while rotating a new app!",
          { style: TOAST_STYLE }
        );
      }

      toast.error("Someting went wrong! Please try again later.", {
        style: TOAST_STYLE,
      });
    },
  });
}
