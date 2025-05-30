/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        indiaGreen: '#138808',
        navyBlue: '#000080',
        indiaWhite: '#FFFFFF',
      },
      keyframes: {
        typing: {
          '0%, 100%': { width: '0ch' },
          '50%': { width: '20ch' }, // Adjust as per your text length
        },
      },
      animation: {
        typing: 'typing 2s steps(20, end) infinite',
      },
    },
  },
  plugins: [],
};
