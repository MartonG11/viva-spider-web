/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: { xl: "0.875rem", "2xl": "1rem" },
      boxShadow: {
        soft: "0 6px 20px rgba(0,0,0,0.08)",
        card: "0 12px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
