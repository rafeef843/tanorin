/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#d71c24",
        "secondary-green": "#038f49",
        "background-light": "#f8f6f6",
        "background-dark": "#1b0e0f",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "cairo": ["Cairo", "sans-serif"],
      },
      borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "3xl": "3rem", "full": "9999px"},
    },
  },
  plugins: [],
}
