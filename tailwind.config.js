/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: '#232F3E',
          DEFAULT: '#131921',
        },
        amazon_yellow: {
          600: '#ff9900',
          400: '#f3a847',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
