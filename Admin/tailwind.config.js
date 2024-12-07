/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        background: "#1E1E1E",
        primary: "#2E8B57",
        accent: "#8FBC8F",
        white: "#FFFFFF",
        secondary: "#454545",
        tetiary: "#e0e0e0",
        latergator: "#028B53",
        alterego: "#69686d",
        vintage: "#D2B48C",
        coastal: "#C4FFA5",
        gramshair: "#F5F6F8",
        raisinblack: "#1E1F23",
        white: "#FFFFFF",
        grey: "#F1F1F1",
        lightgrey: "#FAFAFA",
        fullblack: "#000000",
        black: "#101010",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1025px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
