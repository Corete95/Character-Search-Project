import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "검색",
    path: "/",
    disabled: false,
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "랭킹",
    path: "/ranking",
    disabled: false,
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
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
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "큐브",
    path: "/cube",
    disabled: false,
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
  },
  {
    title: "준비중",
    path: "/preparing",
    disabled: true,
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
