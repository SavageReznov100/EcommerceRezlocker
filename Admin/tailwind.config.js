/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
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
