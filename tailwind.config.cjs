/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/**/**/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or false,
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#42A5F5',
          600: '#2196F3',
          700: '#1E88E5',
          800: '#1976D2',
          900: '#1565C0',
        },
      },
    },
  },
};
