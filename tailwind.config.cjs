/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bushGreen": {
          "tints": {
            100: '#ECF0ED',
            200: '#D9E1DB',
            300: '#C6D2C9',
            400: '#B3C3B7',
            500: '#A0B4A5',
            600: '#8DA492',
            700: '#7A9580',
            800: '#67866E'
          },
          "shades": {
            100: '#34533B',
            200: '#2E4934',
            300: '#273E2C',
            400: '#213425',
            500: '#1A2A1E',
            600: '#141F16',
            700: '#0D150F',
            800: '#070A07'
          }
        }
    }
    }
  },
  plugins: [],
})
