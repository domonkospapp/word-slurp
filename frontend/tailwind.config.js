/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        normal: '6px 6px',
        'b-normal': '0px 4px',
      },
    },
    fontFamily: {
      space: ['SpaceMono'],
    },
  },
  plugins: [],
}
