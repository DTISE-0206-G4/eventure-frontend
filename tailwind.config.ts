import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "ghost-white": "#F6F8FB",
        "true-blue": "#066FD1",
        "american-green": "#2FB344",
        "azureish-white": "#D7E8F8",
        "tufts-blue": "#4299E1",
        platinum: "#DCE1E7",
        "slate-gray": "#707E91",
      },
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
