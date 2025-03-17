/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mustard: "#e7ba34",
        cream: "#e3dedf",
        lightGrey: "#bebebb",
      },
    },
  },
  plugins: [],
}

