/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(243, 100%, 97%)',
          100: 'hsl(243, 100%, 94%)',
          200: 'hsl(243, 97%, 88%)',
          300: 'hsl(245, 97%, 80%)',
          400: 'hsl(249, 95%, 70%)',
          500: 'hsl(252, 90%, 60%)',
          600: 'hsl(256, 85%, 53%)',
          700: 'hsl(258, 75%, 45%)',
          800: 'hsl(258, 70%, 38%)',
          900: 'hsl(259, 65%, 32%)',
          950: 'hsl(260, 70%, 20%)',
        },
        sidebar: {
          DEFAULT: 'hsl(222, 47%, 11%)',
          hover: 'hsl(222, 47%, 15%)',
          active: 'hsl(222, 47%, 20%)',
          border: 'hsl(222, 30%, 20%)',
        },
        surface: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          muted: 'hsl(220, 14%, 96%)',
          subtle: 'hsl(220, 13%, 91%)',
        },
        border: {
          DEFAULT: 'hsl(220, 13%, 91%)',
          muted: 'hsl(220, 13%, 86%)',
        },
        text: {
          primary: 'hsl(222, 47%, 11%)',
          secondary: 'hsl(220, 9%, 46%)',
          muted: 'hsl(220, 9%, 60%)',
          inverse: 'hsl(0, 0%, 100%)',
        },
        status: {
          info: 'hsl(217, 91%, 60%)',
          'info-bg': 'hsl(217, 91%, 95%)',
          success: 'hsl(142, 71%, 45%)',
          'success-bg': 'hsl(142, 71%, 95%)',
          warning: 'hsl(38, 92%, 50%)',
          'warning-bg': 'hsl(38, 92%, 95%)',
          destructive: 'hsl(0, 84%, 60%)',
          'destructive-bg': 'hsl(0, 84%, 95%)',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, hsl(243, 75%, 59%) 0%, hsl(263, 70%, 50%) 100%)',
        'gradient-hero': 'linear-gradient(135deg, hsl(243, 100%, 97%) 0%, hsl(263, 100%, 97%) 50%, hsl(283, 100%, 97%) 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px -4px rgba(0, 0, 0, 0.05), 0 8px 24px -8px rgba(0, 0, 0, 0.1)',
        'elevated': '0 8px 24px -8px rgba(0, 0, 0, 0.1), 0 16px 48px -16px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
