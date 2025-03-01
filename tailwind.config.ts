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
        primaryBg: "#000000", // Pure Black (Background)
        primaryText: "#FFFFFF", // White (Text)
        accent: "#1DA1F2", // Instagram Blue (Links & Buttons)
        borderGray: "#262626", // Dark Gray (Borders & Dividers)
        mutedText: "#A8A8A8", // Soft Gray (Secondary Text)
        hoverBlue: "#1A91DA", // Slightly Brighter Blue (Hover State)
        inputBg: "#121212", // Darker Black (Input Fields, Cards)
        errorRed: "#E0245E", // Red (Errors & Warnings)
        successGreen: "#17BF63", // Green (Success Messages)
        warningOrange: "#F45D22", // Orange (Warnings)
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
