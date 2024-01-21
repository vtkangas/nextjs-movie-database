/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx, ts}",
    "./components/**/*.{tsx, ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: { 
      fontFamily: {
        main: ['var(--font-main)'],
        header: ['var(--font-header)']
      }
    },
  },
  plugins: [require('daisyui')],
}