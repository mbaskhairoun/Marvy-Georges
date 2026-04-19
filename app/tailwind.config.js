/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fbf7f0",
          100: "#f5ecdc",
          200: "#ecdfc4",
          300: "#e0ceaa",
        },
        rust: {
          300: "#c48a6a",
          500: "#9a5a3c",
          600: "#7e4528",
          700: "#5e321b",
          900: "#3a1e10",
        },
        ink: {
          700: "#3d2b1f",
          900: "#1e140d",
        },
        wine: {
          500: "#6b1f2a",
          700: "#4a1219",
        },
        brass: {
          400: "#c9a864",
          500: "#a8874a",
        },
      },
      fontFamily: {
        display: ['"Italiana"', "serif"],
        serif: ['"Cormorant Garamond"', "serif"],
        hand: ['"Parisienne"', "cursive"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        paper: "0 1px 2px rgba(60,30,10,.08), 0 8px 24px rgba(60,30,10,.12)",
        envelope: "0 30px 60px -20px rgba(30,15,5,.55), 0 10px 20px rgba(30,15,5,.3)",
      },
      animation: {
        flicker: "flicker 3s infinite ease-in-out",
        float: "float 6s infinite ease-in-out",
      },
      keyframes: {
        flicker: {
          "0%,100%": { opacity: ".95" },
          "50%": { opacity: ".75" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
