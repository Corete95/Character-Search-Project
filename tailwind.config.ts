import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#202020",
        dark_gray: "#272727",
        main_gray: "#212529",
        medium: "#293245",
        gray: "#57585B",
        asd: "#323941",
        title: "#D7FC25",
        badge_1: "#9CA1AC",
        badge_2: "#C9CFD0",
      },
      backgroundImage: {
        main: "url('/images/main.jpg')",
      },
      screens: {
        mobile: { min: "350px", max: "819px" },
        tablet: { min: "820px", max: "1023px" },
        desktop: { min: "1080px" },
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
      lineHeight: {
        "lh-1": "1",
      },
    },
  },
  plugins: [],
};
export default config;
