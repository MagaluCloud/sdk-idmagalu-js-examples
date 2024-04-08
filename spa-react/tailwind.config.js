/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      gray: "#E5E5E5",
      "gray-100": "#EEEEEE",
      white: "#ffffff",
      blue: "#0086ff",
      hover: "#0079E6",
      gradient: {
        yellow: "#FBE53B",
        orange: "#FF4F01",
        pink: "#FF14B3",
        purple: "#8000FF",
        blue: "#00C1FF",
        green: "#17F036",
        primaryBlue: "#01A0FF",
        secondaryBlue: "#01C5FF",
      },
    },
    extend: {},
  },
  plugins: [],
};
