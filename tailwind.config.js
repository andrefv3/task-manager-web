/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      colors: {
        // El morado exacto de tus capturas
        brand: {
          light: '#EEF2FF',
          DEFAULT: '#6366F1', 
          dark: '#4F46E5',
        },
        // El fondo crema/blanco de Taskia
        background: '#F8FAFC',
      }
    },
  },
  plugins: [],
}