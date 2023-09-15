import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import UserMenuDropdown from "../UserMenuDropdown";

export default async function DashboardNav() {
  const session = await getAuthSession();

  return (
    <>
      <div className="w-full fixed top-0 left-0 h-14 border-b border-input bg-background/50 backdrop-blur-md flex flex-row items-center px-5 justify-between">
        <div>
          <Link href="/panel" className="font-medium">
            Cypher Developer Panel
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="hidden lg:block">
            <Link
              className="inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition-all ease-in-out rounded-full py-1 px-3 bg-zinc-800/40 text-zinc-400 ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800 hover:text-zinc-300"
              href="/docs"
            >
              Docs
            </Link>
          </div>
          <UserMenuDropdown
            image={session?.user?.image}
            name={session?.user?.name || session?.username}
          />
        </div>
      </div>
    </>
  );
}
