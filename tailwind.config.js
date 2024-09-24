/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // for Tailwind CSS v2.x
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // for Tailwind CSS v3.x
  theme: {
    extend: {
      colors: {
        "theme-darkest": "#03030c",
        "theme-smooth-dark": "#111213",
        "theme-dn": "#030c21",
        "theme-sand": "#e8d1ae",
        "theme-sand-dark": "#c69963",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn .25s ease-in-out",
        fadeInQuick: "fadeIn .1s ease-out",
        slowBounce: 'bounce 2s infinite',
      },
    },
  },

  plugins: [],
};
