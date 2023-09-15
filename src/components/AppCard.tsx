import { AppProps } from "@/types";
import PlaceholderChart from "./Chart";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { Box } from "lucide-react";

interface Props {
  app: AppProps;
}

export default function AppCard({ app }: Props) {
  return (
    <Link
      href={`/panel/${app.id}`}
      className="w-11/12 sm:w-[400px] md:w-[500px] h-[200px] p-3 py-5 border rounded-md"
    >
      <div className="flex items-center gap-2">
        <Box className="w-5 h-5" />
        <h3 className="text-xl font-medium">{app.name}</h3>
      </div>
      <p className="text-sm text-foreground/60">{app.id}</p>
      <PlaceholderChart />
      <div className="w-full flex text-sm mt-5">
        {formatDistanceToNowStrict(new Date(app.createdAt), {
          addSuffix: true,
        })}
      </div>
    </Link>
  );
}
