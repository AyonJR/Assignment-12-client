/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        cyanCustom: '#13bfb1', 
        blueCustom : '#3FA2F6'   // You can name it whatever you prefer
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

