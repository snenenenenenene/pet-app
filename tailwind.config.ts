import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chewy: ["Chewy", "cursive"],
        sniglet: ["Sniglet", "cursive"],
      },
      colors: {
        light: {
          primary: "#EE8E77",
          "primary-2": "#F9CDAE",
          secondary: "#6DBCB9",
          dark: "#1D1D1D",
          light: "#FCF4EA",
          // light: "#F9CDAE",
          "light-2": "#F9F9F9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
