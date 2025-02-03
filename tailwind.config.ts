import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: "#E4EDF1",
        darkBlue: "#091834",
        gold: "#FFC94B",
        jetBlack: "#1F1F1F",
      },
    },
  },
  plugins: [],
} satisfies Config;
