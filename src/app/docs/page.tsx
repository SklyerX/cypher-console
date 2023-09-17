import Link from "next/link";
import { redirect } from "next/navigation";

export default function Docs() {
  redirect("/docs/intro");
  return (
    <div className="w-full h-full flex flex-col mt-20 gap-1 items-center justify-between">
      <h3 className="font-semibold text-xl">Redirecting you...</h3>
      <span className="text-lg">
        If you don't get redirected please click{" "}
        <Link href="/docs/intro" className="font-medium underline">
          here
        </Link>
      </span>
    </div>
  );
}
