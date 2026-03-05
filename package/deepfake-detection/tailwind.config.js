/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: "#E5F2FF",
          100: "#CCE5FF",
          500: "#007AFF",
          600: "#0051D5",
          900: "#003D99",
        },
        neutral: {
          50: "#F8F9FA",
          100: "#F0F1F3",
          200: "#E8EAF0",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },
        success: {
          100: "#D1FAE5",
          500: "#10B981",
        },
        warning: {
          100: "#FEF3C7",
          500: "#F59E0B",
        },
        error: {
          100: "#FEE2E2",
          500: "#EF4444",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.4)",
          emphasized: "rgba(255, 255, 255, 0.5)",
          subtle: "rgba(255, 255, 255, 0.35)",
          border: "rgba(255, 255, 255, 0.3)",
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #E8EAF0 0%, #F4F5F9 50%, #FAFBFF 100%)',
        'gradient-hero': 'linear-gradient(135deg, #E6EFF8 0%, #F0F4FA 100%)',
      },
      fontSize: {
        'hero': '64px',
        'title': '48px',
        'subtitle': '28px',
        'heading': '20px',
        'body': '16px',
        'small': '14px',
        'caption': '12px',
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        relaxed: '1.7',
      },
      spacing: {
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },
      borderRadius: {
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.08)',
        'button': '0 4px 12px rgba(0, 122, 255, 0.3)',
        'button-hover': '0 6px 16px rgba(0, 122, 255, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 600ms ease-out',
        'slide-up': 'slideUp 400ms ease-out',
        'pulse-glow': 'pulseGlow 1s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 122, 255, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 122, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}