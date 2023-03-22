/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        "primary": "#2b2c2d",
        "secundary": "#2e3031",
        "tertiary": "#333536",
        "quaternary": "#3a3d3e",
        "quinary": "#a29d98"
      },
    },
  },
  plugins: [],
}
