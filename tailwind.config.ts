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
        dark: "#121212",
        medium: "#293245",
        gray: "#57585B",
      },
      backgroundImage: {
        main: "url('/images/main.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
