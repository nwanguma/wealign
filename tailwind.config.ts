import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["TTCommons", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "600",
        bold: "600",
      },
    },
  },
  plugins: [],
};
export default config;
