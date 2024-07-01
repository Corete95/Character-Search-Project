"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SIDENAV_ITEMS } from "../constants";
import { usePathname } from "next/navigation";
import { SideNavItem } from "@/types";

const MenuHeader = () => {
  const pathname = usePathname();
  const [submenuVisible, setSubmenuVisible] = useState<number | null>(null);

  const handleSubmenuClick = () => {
    setSubmenuVisible(null);
  };

  const isActive = (item: SideNavItem) => {
    if (pathname === item.path) return true;
    if (item.submenu) {
      return item.subMenuItems.some((subItem) => pathname === subItem.path);
    }
    return false;
  };

  return (
    <nav className="h-48px pt-2">
      <ul className="flexCenter gap-2 w-full h-full">
        {SIDENAV_ITEMS.map((item, index) => (
          <li
            className="h-full relative flexCenter group hover:bg-[#80808014]"
            key={`${item.path}${index}`}
            onMouseEnter={() => setSubmenuVisible(index)}
            onMouseLeave={() => setSubmenuVisible(null)}
          >
            <Link href={item.path} className="min-w-45px flexCenter text-sm">
              <span
                className={`${
                  isActive(item)
                    ? "border-b-2 border-black dark:border-white"
                    : ""
                }`}
              >
                {item.title}
              </span>
            </Link>
            {item.submenu && (
              <ul
                className={`absolute ${
                  submenuVisible === index ? "block" : "hidden"
                } mobile:hidden top-full right-[-17px] z-50 bg-white dark:bg-dark p-2 border-t-2 border-[#9e9e9e6e]`}
              >
                {item.subMenuItems.map((subItem) => (
                  <li
                    key={subItem.title}
                    className="w-full text-black dark:text-white hover:bg-[#80808014]"
                    onClick={handleSubmenuClick}
                  >
                    <Link
                      href={subItem.path}
                      className={`flexCenter text-sm px-5 py-2.5 whitespace-nowrap ${
                        pathname === subItem.path ? "font-bold" : ""
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuHeader;
