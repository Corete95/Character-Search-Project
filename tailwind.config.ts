import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const px0_200 = Object.fromEntries(
  Array.from({ length: 200 }, (_, i) => [`${i + 1}px`, `${i + 1}px`]),
);
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      fontSize: px0_200,
      borderWidth: px0_200,
      spacing: px0_200,
      colors: {
        white_bg: "#FAFAFA",
        white_gray_100: "#F5F5F6",
        modeWhite: "#f5f5f5",
        rankingDark: "#18181b",
        userBorder: "#dcdcdc",
        dark: "#202020",
        dark_gray: "#272727",
        main_gray: "#212529",
        medium: "#293245",
        gray: "#57585B",
        dark_bg_100: "#323941",
        title: "#D7FC25",
        badge_1: "#9CA1AC",
        badge_2: "#C9CFD0",
        legendary: "#A3C800",
        unique: "#EB9A0D",
        epic: "#8065D8",
        rare: "#3DC3D9",
        artifact_purple: "#edecfb",
        artifact_bt_purple: "#ddd3fe",
        artifact_blue: "#ecf5fc",
        artifact_bt_blue: "#d2e6f7",
      },
      backgroundImage: {
        main: "url('/images/main.jpg')",
        arcana: "url('/images/map/arcana.png')",
        pirate: "url('/images/map/pirate.png')",
        palace: "url('/images/map/palace.png')",
        beach: "url('/images/map/beach.png')",
        mapleTree: "url('/images/map/mapleTree.png')",
        orbisPet: "url('/images/map/orbisPet.png')",
      },
      screens: {
        mobile: { min: "320px", max: "820px" },
        tablet: { min: "820px", max: "1080px" },
        desktop: { min: "1080px" },
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
      lineHeight: {
        "lh-1": "1",
      },
      maxWidth: {
        "1200": "1200px",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
