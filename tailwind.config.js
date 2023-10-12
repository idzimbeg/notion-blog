/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGray: {
          light: '#2e3039',
          base: '#eeeeee',
          dark: '#1f2028',
        },
        primary: {
          light: '#f3f3f3',
          base: '#050816',
          dark: '#090325',
          extra: '#925eff',
        },
        secondary: {
          light: '#aaa6c3',
          base: '#151030',
          dark: '#100d25',
        },
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': "url('../assets/herobg.png')",
        'white-pattern': "url('../assets/whitebg.png')",
      },
    },
  },
  darkMode: 'class',
};
