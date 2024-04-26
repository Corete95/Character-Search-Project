"use client";

import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import useScroll from "@/hooks/useScroll";
import Themetoggle from "./Themetoggle";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-gray-200`,
        {
          "border-b border-white_gray_100 bg-white/75 backdrop-blur-lg":
            scrolled,
          "border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[65px] items-center justify-between px-4 dark:bg-dark">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-2 items-center justify-center md:hidden"
          >
            <Image
              className=""
              src="/images/logo250.png"
              width={44}
              height={44}
              alt=""
            />
            <span className="font-bold text-xl flex ">Mesoya</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div>
            <Themetoggle />
            {/* <span className="font-semibold text-sm">HQ</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
