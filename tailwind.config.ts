import type { Config } from 'tailwindcss';

/** @type {Config} */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}', // Add any folders where you're using Tailwind classes
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './node_modules/@tailwindcss/forms/**/*.{ts,tsx}', // If using Tailwind forms plugin
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / 1)',
        foreground: 'hsl(var(--foreground) / 1)',
        primary: 'hsl(var(--primary) / 1)',
        'primary-foreground': 'hsl(var(--primary-foreground) / 1)',
        secondary: 'hsl(var(--secondary) / 1)',
        'secondary-foreground': 'hsl(var(--secondary-foreground) / 1)',
        muted: 'hsl(var(--muted) / 1)',
        'muted-foreground': 'hsl(var(--muted-foreground) / 1)',
        accent: 'hsl(var(--accent) / 1)',
        'accent-foreground': 'hsl(var(--accent-foreground) / 1)',
        destructive: 'hsl(var(--destructive) / 1)',
        'destructive-foreground': 'hsl(var(--destructive-foreground) / 1)',
        border: 'hsl(var(--border) / 1)',
        input: 'hsl(var(--input) / 1)',
        ring: 'hsl(var(--ring) / 1)',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        oswald: ['var(--font-oswald)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontSize: {
        xs: ['14px', { lineHeight: '20px' }],
        sm: ['16px', { lineHeight: '24px' }],
        base: ['18px', { lineHeight: '28px' }],
        lg: ['20px', { lineHeight: '30px' }],
      },
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add any Tailwind plugins you use
  ],
  darkMode: 'class', // Enables dark mode support
};

export default config;
