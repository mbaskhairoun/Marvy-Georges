/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: '#5a3722',
          100: '#4a2d1c',
          300: '#3A2418',
          500: '#2B1810',
          700: '#22120b',
          900: '#170c06',
        },
        ivory: {
          50: '#fbf6ec',
          100: '#F5EDE0',
          200: '#ead9bd',
          300: '#dcc69e',
          400: '#c9ab7b',
        },
        gold: {
          200: '#e3cba0',
          300: '#d6b985',
          400: '#c2a070',
          500: '#B8956A',
          600: '#9c7c52',
          700: '#7b6240',
        },
      },
      fontFamily: {
        display: ['"Italiana"', '"Cormorant Garamond"', 'serif'],
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Lora"', 'Georgia', 'serif'],
        sans: ['"Cormorant Garamond"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'caps-sm': '0.18em',
        'caps': '0.28em',
        'caps-lg': '0.42em',
      },
      animation: {
        flicker: 'flicker 3s infinite ease-in-out',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: '.95' },
          '50%': { opacity: '.78' },
        },
      },
    },
  },
  plugins: [],
};
