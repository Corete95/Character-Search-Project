import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "홈",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "홈2",
    path: "/home2",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "홈3",
    path: "/home3",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "홈4",
    path: "/home4",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
  },
  {
    title: "홈5",
    path: "/home5",
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
