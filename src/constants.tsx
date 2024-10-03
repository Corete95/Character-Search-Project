import { SideNavItem } from "./types";

const baseUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_NAME}`);

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
    title: "길드",
    path: "/guild",
    disabled: true,
    submenu: false,
  },
  {
    title: "주화",
    path: "/coinage",
    disabled: false,
    submenu: false,
  },
  {
    title: "유틸",
    path: "/utilitys",
    disabled: false,
    submenu: false,
  },
];

export const navigationSchemaItems = [
  {
    "@type": "SiteNavigationElement",
    position: 1,
    name: "종합 랭킹",
    description: "종합 랭킹을 확인해보세요!",
    url: `${baseUrl}ranking/overall`,
  },
  {
    "@type": "SiteNavigationElement",
    position: 2,
    name: "길드 랭킹",
    description: "길드 랭킹을 확인해보세요!",
    url: `${baseUrl}ranking/guild`,
  },
  {
    "@type": "SiteNavigationElement",
    position: 3,
    name: "주화 시세",
    description: "메트코인 주화 시세를 확인해보세요!",
    url: `${baseUrl}coinage`,
  },
];
