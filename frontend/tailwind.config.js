/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(2deg)' },
          '75%': { transform: 'translate(-5px, 10px) rotate(-1deg)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-8px, 8px) rotate(-2deg)' },
          '66%': { transform: 'translate(8px, -8px) rotate(1deg)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(12px, 12px) rotate(3deg)' },
        },
        'float-mini-1': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(5px, -5px) rotate(5deg) scale(1.05)' },
        },
        'float-mini-2': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(-5px, 5px) rotate(-5deg) scale(1.05)' },
        },
        'float-mini-3': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(8px, 3px) rotate(3deg) scale(1.02)' },
        },
        'slide-in-left': {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-200px) translateY(100px) scale(0.9) rotate(-10deg)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)'
          }
        },
        'slide-in-right': {
          '0%': { 
            opacity: '0',
            transform: 'translateX(200px) translateY(100px) scale(0.9) rotate(10deg)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)'
          }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
        'float-1': 'float-1 8s ease-in-out infinite',
        'float-2': 'float-2 12s ease-in-out infinite',
        'float-3': 'float-3 10s ease-in-out infinite',
        'float-mini-1': 'float-mini-1 4s ease-in-out infinite',
        'float-mini-2': 'float-mini-2 6s ease-in-out infinite',
        'float-mini-3': 'float-mini-3 5s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slide-in-right 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards'
      },
      backgroundSize: {
        'gradient-size': '400% 400%',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 