// tailwind.config.js
module.exports = {
  darkMode: "class", // Usa .dark en <html>
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))",
        },
        // Ejemplo para grayish si quieres usarlo en componentes
        grayish: {
          50: "hsl(var(--grayish-50))",
          100: "hsl(var(--grayish-100))",
          200: "hsl(var(--grayish-200))",
          300: "hsl(var(--grayish-300))",
          400: "hsl(var(--grayish-400))",
          500: "hsl(var(--grayish-500))",
          600: "hsl(var(--grayish-600))",
        },
      },
    },
  },
  plugins: [],
};
