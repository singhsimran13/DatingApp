/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "navbar-color": "#E1DCC2",
        "brand-primary": {
          light: "#f5777b",
          DEFAULT: "#d72638",
          dark: "#98192d",
          50: "#fee6e5",
          100: "#fccfd0",
          200: "#f9a8a8",
          300: "#f5777b",
          400: "#ec4751",
          500: "#d72638",
          600: "#b61a2e",
          700: "#98192d",
          800: "#83182c",
          900: "#490812",
        },
        "brand-secondary": {
          light: "#fcd3cc",
          DEFAULT: "#f49d8e",
          dark: "#d4462e",
          50: "#fdf4f3",
          100: "#fde7e3",
          200: "#fcd3cc",
          300: "#f8b5a9",
          400: "#f49d8e",
          500: "#e7634c",
          600: "#d4462e",
          700: "#b23823",
          800: "#933221",
          900: "#7a2f22",
        },
      },
    },
  },
  plugins: [],
};
