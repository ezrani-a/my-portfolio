/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important for toggle mode
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
