/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F3EE',
        navy: {
          DEFAULT: '#0F2A4A',
          dark: '#0A1C33',
          light: '#1B3F66',
        },
        honor: '#B0892F', // restrained gold accent
        flagred: '#9B2226', // muted Old Glory red, used sparingly
        ink: '#15212E',
        muted: '#5B6675',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
