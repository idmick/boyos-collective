// tailwind.config.js
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        // your custom animation
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
    typography, // official Tailwind typography
  ],
}

export default config
