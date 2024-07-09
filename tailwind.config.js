/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // for Tailwind CSS v2.x
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // for Tailwind CSS v3.x
  theme: {
    extend: {
      colors: {
        'theme-darkest': '#010019',
        'theme-dn': '#030c21',
        'theme-sand': '#e8d1ae',
      },
    },
  },

  plugins: [],
}

