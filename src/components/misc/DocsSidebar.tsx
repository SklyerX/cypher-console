"use client";

import clsx from "clsx";
import { allDocs } from "contentlayer/generated";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Overlay from "../Overlay";

import { motion } from "framer-motion";

export default function DocsSidebar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleOpened = () => setIsOpened(!isOpened);

  return (
    <div>
      <div className="lg:flex hidden">
        <div className="w-60 flex p-3 border-r h-screen flex-col gap-2 fixed top-0 left-0">
          {allDocs.map((doc, index) => (
            <Link
              href={doc.slug}
              className={clsx(
                "h-fit",
                pathname === doc.slug && "font-semibold"
              )}
              key={index}
            >
              {doc.title}
            </Link>
          ))}
        </div>
        <div className="w-[calc(100%-15rem)] bg-background z-50 pr-3 border-b items-center h-10 ml-60 flex justify-end fixed top-0">
          <Link
            href="/panel"
            className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300"
          >
            Launch Console
          </Link>
        </div>
      </div>
      <div className="lg:hidden w-full flex px-3 items-center justify-between h-12 bg-foreground/10 backdrop-blur-lg fixed top-0 left-0">
        <Menu onClick={toggleOpened} />
        <Link
          href="/panel"
          className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300"
        >
          Launch Console
        </Link>
      </div>
      {isOpened ? (
        <Overlay onClick={toggleOpened}>
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2, type: "spring", mass: 0.6 }}
            className="sm:w-96 w-full p-3 bg-white text-black backdrop-blur-lg h-screen z-50"
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-3">
                {allDocs.map((doc, index) => (
                  <Link
                    href={doc.slug}
                    className={clsx(
                      "h-fit",
                      pathname === doc.slug && "font-semibold"
                    )}
                    key={index}
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
              <X className="my-1 w-5 h-5" onClick={toggleOpened} />
            </div>
          </motion.div>
        </Overlay>
      ) : null}
    </div>
  );
}
