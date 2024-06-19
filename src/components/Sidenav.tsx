"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => {
  return (
    // <div className="md:w-60 bg-white h-screen flex-1 fixed  hidden md:flex dark:bg-dark">
    <div className="desktop:w-60 desktop:flex bg-white h-screen flex-1 fixed  hidden  dark:bg-dark">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-2 items-center justify-center md:justify-start md:px-6  h-[65px] w-full"
        >
          <Image
            className=""
            src="/images/logo250.png"
            width={44}
            height={44}
            alt=""
            priority
          />
          <span className="font-bold text-2xl hidden md:flex">Mesoya</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg w-full justify-between hover:bg-[#E7E7E9] dark:hover:bg-[#2D2D2D]  ${
              pathname.includes(item.path)
                ? "bg-[#E7E7E9] dark:bg-[#57585B] "
                : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center dark:text-white">
              {item.icon}
              <span className="font-semibold text-sm flex dark:text-white">
                {item.title}
              </span>
            </div>

            <div
              className={`${
                subMenuOpen ? "rotate-180" : ""
              } flex dark:text-white`}
            >
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span className="dark:text-white text-sm">
                      {subItem.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.disabled ? "" : item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-[#E7E7E9] dark:hover:bg-[#2D2D2D] dark:text-white ${
            item.path === pathname ? "bg-[#E7E7E9] dark:bg-[#57585B]" : ""
          } ${item.disabled ? "cursor-not-allowed " : ""}`}
          aria-disabled={false}
        >
          {item.icon}
          <span className="font-semibold text-sm flex dark:text-white">
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};
