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
        incorrect: "#ff000033",
        correct: "#00ff0033",
      },
      fontFamily: {
        "vazirmatn": '"Vazirmatn", sans-serif',
      },
    },
  },
  plugins: [typograhy],
};
