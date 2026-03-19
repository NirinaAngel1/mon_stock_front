const { DEFAULT_CIPHERS } = require('tls');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",   // pour App Router
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Utilisation du mode sombre basé sur une classe
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',    
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        border: 'hsl(var(--border))',
        accent: {
          lime:'#A3E635',
          red: '#F87171',
          blue: '#60A5FA',
        }
      },
      boxShadow: {
        'custom':'0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
};
