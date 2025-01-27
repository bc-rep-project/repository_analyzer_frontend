module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3b82f6',
          dark: {
            900: '#0f172a',
            800: '#1e293b',
          }
        }
      },
    },
    darkMode: 'class',
    plugins: [],
  }