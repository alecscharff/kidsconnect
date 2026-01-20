/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tile: {
          unselected: '#EFEFE6',
          selected: '#5A594E',
        },
        solved: {
          yellow: '#F9DF6D',
          green: '#A0C35A',
          blue: '#B0C4EF',
          purple: '#BA81C5',
        },
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
