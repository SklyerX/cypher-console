"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  image?: string | null;
  name?: string | null;
}

export default function UserMenuDropdown({ image, name }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none inline-flex gap-1 justify-center items-center overflow-hidden text-sm font-medium transition-all ease-in-out rounded-full py-1 px-3 bg-zinc-800/40 text-zinc-400 ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800 hover:text-zinc-300">
        <Image
          src={image || "https://via.placeholder.com/1000"}
          alt="User profile picture"
          className="rounded-full"
          width={30}
          height={30}
        />
        <span className="ml-2">{name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="lg:hidden" asChild>
          <Link href="/docs">Docs</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOut();
            redirect("/");
          }}
        >
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
