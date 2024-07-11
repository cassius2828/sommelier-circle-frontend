/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // for Tailwind CSS v2.x
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // for Tailwind CSS v3.x
  theme: {
    extend: {
      colors: {
        'theme-darkest': '#03030c',
        'theme-dn': '#030c21',
        'theme-sand': '#e8d1ae',
        'theme-sand-dark': '#c69963',
      },
    },
  },

  plugins: [],
}

