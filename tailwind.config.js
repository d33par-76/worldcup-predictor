/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fifa: {
          blue: '#006994',
          teal: '#00b4d8',
          gold: '#f77f00',
          amber: '#fcbf49',
          dark: '#001f3f',
        },
      },
    },
  },
  plugins: [],
}
