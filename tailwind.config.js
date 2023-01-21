import typograhy from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./src/main.tsx"],
  theme: {
    extend: {
      colors: {
        light: "var(--light)",
        dark: "var(--dark)",
        "less-light": "var(--less-light)",
        "less-dark": "var(--less-dark)",
      },
      fontFamily: {
        "ipsa": '"IBM Plex Sans Arabic", sans-serif',
      },
    },
  },
  plugins: [typograhy],
};
