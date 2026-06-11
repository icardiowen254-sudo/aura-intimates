/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf6f0',
          100: '#fbeada',
          200: '#f5cdb5',
          300: '#edaa86',
          400: '#e47f54',
          500: '#dc6133',
          DEFAULT: '#E8B4B8',
          light: '#F5D6D8',
          dark: '#C48B8F',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          light: '#FBF3E6',
          dark: '#E8CEAA',
        },
        burgundy: {
          DEFAULT: '#6B2737',
          light: '#8B3448',
          dark: '#4A1824',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#F0E8DC',
        },
        ink: {
          DEFAULT: '#1A1614',
          light: '#2D2520',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
