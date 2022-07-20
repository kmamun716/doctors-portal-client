/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          info: "#3A4256",
          banner:'#D4D9E3'
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
