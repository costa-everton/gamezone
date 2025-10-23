/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0F1C',
        'accent-blue': '#00B3FF',
        'accent-aqua': '#14FFEC',
        'text-primary': '#E6E6E6',
        'text-secondary': '#999999'
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'Outfit', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 179, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 179, 255, 0.4)' }
        }
      }
    }
  },
  plugins: []
}
