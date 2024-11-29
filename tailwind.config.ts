import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
