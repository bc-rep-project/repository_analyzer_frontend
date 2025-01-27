module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          dark: {
            900: '#0f172a',
            800: '#1e293b',
          }
        },
        animation: {
          'gradient': 'gradient 8s linear infinite',
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          gradient: {
            '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          }
        }
      },
    },
    darkMode: 'class',
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }