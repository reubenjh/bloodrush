/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // color pallete
        primary: '#ff7b00',
        'primary-light': '#ff8f26',
        'primary-border': '#ffbd80',
        'primary-border-shadow': 'rgba(255,123,0,0.25)',
        secondary: '#1c1d21',
        info: '#633dc6',
        red: '#FC293D',
        'red-border-shadow': 'rgba(252,35,56,0.25)',
        blue: '#0d6efd',

        // defaults
        background: '#eef0f2',
        'text-color': 'black',
        'nav-color': 'rgba(0,0,0,0.55)',
        'footer-color': '#dee2e6',
        'line-color': '#dee2e6',

        // dark defaults
        'dark-background': '#222222',
        'dark-text-color': '#e1e1e1',
        'dark-nav-color': 'rgba(255,255,255,0.55)',
        'dark-footer-color': '#515151',
        'dark-line-color': 'hsla(0,0%,100%,.15)',
      },
      fontSize: {
        base: ['0.875rem'],
        sm: ['0.75rem'],
        xs: ['0.625rem'],
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        logo: ['Noto Emoji'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-gradient-mask-image'),
  ],
};
