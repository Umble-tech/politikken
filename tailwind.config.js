/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        party: {
          ap: "#d4381b",
          frp: "#294788",
          h: "#4b9adb",
          krf: "#f3b952",
          mdg: "#658947",
          r: "#791a12",
          sp: "#b9cc49",
          sv: "#bc2ac3",
          v: "#5bc1a8",
        },
      },
    },
  },
  plugins: [],
};
