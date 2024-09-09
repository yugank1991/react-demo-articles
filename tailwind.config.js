/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Point to all your source files
  theme: {
    extend: {
      screens: {
        xs:'540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};

