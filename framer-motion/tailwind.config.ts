import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jade: {
          "50": "#effef7",
          "100": "#dafeef",
          "200": "#b8fadd",
          "300": "#81f4c3",
          "400": "#43e5a0",
          "500": "#1acd81",
          "600": "#0fa968",
          "700": "#108554",
          "800": "#126945",
          "900": "#11563a",
          "950": "#03301f",
        },
      },
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
    },
  },
  plugins: [],
} satisfies Config;
