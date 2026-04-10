/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Lora', 'Georgia', 'serif'],
      display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        binah: {
          purple: '#4d37f6',
          charcoal: '#171e19',
          lavender: '#ede9fe',
          dark: '#0A0A0A',
          black: '#000000',
          card: '#111111',
          cyan: '#00D1FF',
          pink: '#FF2E97',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 40px -10px rgba(77, 55, 246, 0.5)',
        'glow-cyan': '0 0 40px -10px rgba(0, 209, 255, 0.5)',
        'glow-pink': '0 0 40px -10px rgba(255, 46, 151, 0.5)',
        'bento': '0px 4px 24px -1px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        bento: '2rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
