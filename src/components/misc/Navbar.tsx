"use client";

import clsx from "clsx";
import { Book, Github, Home, LogIn, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isTop, setIsTop] = useState<boolean>(true);
  const [opened, setOpened] = useState<boolean>(false);

  const toggleOpened = () =>
    setOpened((prev) => {
      return !prev;
    });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      {/* MOBILE */}
      <div
        className={clsx(
          "w-full h-16 flex flex-row items-center justify-between p-2 z-50 fixed top-0 left-0",
          !isTop
            ? "bg-background/20 backdrop-blur-lg border-b border-input"
            : null
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <Image src="/hat.png" alt="Cypher Hat" width={55} height={35} />
          <h3 className="font-medium">Cypher</h3>
        </div>
        <div className="hidden md:flex flex-row gap-4">
          <Link
            href="/"
            className="text-sm flex flex-row items-center gap-2 text-zinc-200 hover:text-white"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/docs"
            className="text-sm flex flex-row items-center gap-2 text-zinc-200 hover:text-white"
          >
            <Book className="w-4 h-4" />
            Docs
          </Link>
          <Link
            href="https://github.com/SklyerX/cypher-console"
            className="text-sm flex flex-row gap-2 items-center justify-center rounded-full border border-foreground px-3 py-1 mt-1 hover:bg-white hover:text-black"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            href="/login"
            className="text-sm flex flex-row items-center gap-2 bg-green-500/40 px-4 py-1.5 hover:border-green-500 hover:bg-green-600 rounded-full border border-green-700"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </div>
        <div className="relative md:hidden">
          <Menu onClick={toggleOpened} />
          {opened ? (
            <div className="absolute w-[200px] backdrop-blur-md bg-background/95 rounded-md border border-input right-4">
              <div className="flex flex-col gap-3 p-4">
                <Link
                  href="/"
                  className="text-sm flex flex-row items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <Link
                  href="/docs"
                  className="text-sm flex flex-row items-center gap-2"
                >
                  <Book className="w-4 h-4" />
                  Docs
                </Link>
                <Link
                  href="/login"
                  className="text-sm flex flex-row items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </div>
              <div className="w-full rounded-b-md border-t border-input px-4 py-1 pb-2">
                <Link
                  href="https://github.com/SklyerX/cypher-console"
                  className="text-sm flex flex-row gap-2 items-center justify-center rounded-full border border-background py-2 mt-1"
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
