import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        gray: colors.neutral,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
