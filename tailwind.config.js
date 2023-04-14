/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'first': '#1e1e1e',
        'second': '#2c2e2f',
        'third': '#333536',
        'fourth': '#3a3d3e',
        'fourthAndAHalf': '#4a4d4e' ,
        'fifth': '#5C5A5A',
        'sixth': '#797776',
        'seventh': '#a29d98',
        'eigth': '#D7DCDE',
        'signature': '#00C8A5',
        'h-signature': '#00FFD4',
      },
      fontFamily: {
        sans: ['var(--font-lato)']
      }
    },
  },
  plugins: [],
};
