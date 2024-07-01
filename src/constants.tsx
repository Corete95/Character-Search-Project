import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "메인",
    path: "/",
    disabled: false,
    submenu: false,
  },
  {
    title: "랭킹",
    path: "/ranking/overall",
    disabled: false,
    submenu: true,
    subMenuItems: [
      { title: "종합", path: "/ranking/overall" },
      { title: "길드", path: "/ranking/guild" },
    ],
  },
  {
    title: "주화",
    path: "/coinage",
    disabled: false,
    submenu: false,
  },
  {
    title: "큐브",
    path: "/cube",
    disabled: true,
    submenu: false,
  },
];
