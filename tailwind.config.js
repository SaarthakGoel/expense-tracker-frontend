/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        darkprimary: 'var(--dark-primary)',
        bodycolor: 'var(--body-color)'
      },
    },
  },
  plugins: [],
}