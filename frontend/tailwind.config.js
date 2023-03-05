// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        normal: '6px 6px',
        'b-normal': '0px 4px',
      },
    },
    fontFamily: {
      space: ['var(--font-space)', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
}
