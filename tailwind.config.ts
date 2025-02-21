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
        primaryBg: "#15202B", // Dark Grayish Blue (Background)
        primaryText: "#FFFFFF", // White (Text)
        accent: "#1DA1F2", // Blue (Links & Buttons)
        borderGray: "#38444D", // Gray (Borders & Dividers)
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        system: [
          '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
          '"Helvetica Neue"', 'Arial', 'sans-serif'
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
