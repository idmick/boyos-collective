// tailwind.config.js
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      fontFamily: {
        limelight: ['Limelight', 'cursive'],
        pretoria: ['Pretoria', 'serif'],
        moret: ['Moret', 'serif'],
        anton: ['Anton', 'Impact', 'Arial Black', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
  ],
}
