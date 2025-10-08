/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052cc',
        secondary: '#ff9800',
        success: '#28a745',
        danger: '#dc3545',
      },
    },
  },
  plugins: [],
}

