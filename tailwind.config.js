/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#b11f2d',
          dark: '#1e2329',
          muted: '#6b7280',
          cream: '#f7f5f2',
          line: '#e6d6d9'
        }
      },
      boxShadow: {
        soft: '0 24px 70px -30px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
}
