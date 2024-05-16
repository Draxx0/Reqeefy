import type { Config } from 'tailwindcss';
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './containers/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      maxWidth: {
        '8/10': '80%',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          '500': 'var(--primary-500)',
          '700': 'var(--primary-700)',
          '900': 'var(--primary-900)',
        },
        white: {
          DEFAULT: 'var(--neutral-white)',
          _30: 'var(--neutral-white-30)',
        },

        gray: {
          '500': 'var(--gray-500)',
          '700': 'var(--gray-700)',
          '900': 'var(--gray-900)',
        },
        green: {
          '700': 'var(--green-700)',
          '900': 'var(--green-900)',
        },
        red: {
          '700': 'var(--red-700)',
          '900': 'var(--red-900)',
        },
        yellow: {
          '700': 'var(--yellow-700)',
          '900': 'var(--yellow-900)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
      },
      backgroundImage: {
        'gradient-main':
          'linear-gradient(128.79deg, rgba(255,255,255,.3) 0, rgba(255,255,255,.15) 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
