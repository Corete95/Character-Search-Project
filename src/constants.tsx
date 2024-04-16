import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "메인",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "랭킹",
    path: "/home2",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "종합", path: "/projects" },
      { title: "길드", path: "/projects/web-design" },
      { title: "전투력", path: "/projects/graphic-design" },
      { title: "무릉도장", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "주화",
    path: "/home3",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "큐브",
    path: "/home4",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
  },
  {
    title: "준비중",
    path: "/home5",
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
