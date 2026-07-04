/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-primary':  '#0B1315',
        'bg-alt':      '#121216',
        'text-primary': '#F8FAFC',
        'text-body':   '#94A3B8',
        'accent-mint': '#A7F3F0',
        'accent-lav':  '#EBD5FF',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}