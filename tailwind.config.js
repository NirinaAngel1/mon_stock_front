/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",   // pour App Router
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6C43FF',
          DEFAULT: '#37157B',
          dark: '#1b0d3f',
        },
        text: {
          light: '#2D2D2D',
          DEFAULT:'#CCCCCC',
          dark:'#F3F3F3',
        },
        background: {
          light: '#EFE7FF',
          dark: '#1b0d3f',
        },
        boxShadow: {
        'light': '0 4px 6px rgba(0,0,0,0.1)',
        'dark': '0 4px 6px rgba(255,255,242,0.8)',
        },
        accent:{
          lime : '#A3E635',
          red : '#F87171',
          blue : '#60A5FA',
        }
      }
    },
  },
  darkMode: 'class',
};
