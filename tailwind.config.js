/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fifa: {
          blue: '#1a4f8a',
          gold: '#c9a84c',
          dark: '#0d2137',
        },
      },
    },
  },
  plugins: [],
}
