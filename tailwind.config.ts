import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1080px',
        xl: '1465px',
        xx: '1680px',
      },
      colors: {
        first: '#1e1e1e',
        second: '#2c2e2f',
        third: '#333536',
        fourth: '#3a3d3e',
        fourthAndAHalf: '#4a4d4e',
        fifth: '#5C5A5A',
        sixth: '#797776',
        seventh: '#a29d98',
        eigth: '#D7DCDE',
        signature: '#00ffff',
        'h-signature': '#00FFD4',
      },
      fontFamily: {
        sans: ['var(--font-lato)'],
      },
    },
  },
  plugins: [],
};
export default config;
