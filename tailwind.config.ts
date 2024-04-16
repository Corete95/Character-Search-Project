import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white_bg: "#FAFAFA",
        white_gray_100: "#F5F5F6",
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
      },
      backgroundImage: {
        main: "url('/images/main.jpg')",
      },
      screens: {
        mobile: { min: "350px", max: "820px" },
        tablet: { min: "820px", max: "1080px" },
        desktop: { min: "1080px" },
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
      lineHeight: {
        "lh-1": "1",
      },
      fontSize: {
        14: "14px",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
