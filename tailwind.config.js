/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(56, 189, 248, 0.3)',
        'glow-md': '0 0 25px rgba(56, 189, 248, 0.4)',
        'glow-lg': '0 0 35px rgba(56, 189, 248, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(75, 85, 99, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 85, 99, 0.05) 1px, transparent 1px)',
        'noise': 'url("data:image/png;base64,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")',
      },
    },
  },
  plugins: [],
};