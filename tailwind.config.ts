import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        paper: { DEFAULT: '#F5EBD7', light: '#FBF5E9', dark: '#EADBBE', edge: '#DCC8A2' },
        navy: { DEFAULT: '#1F3A5F', dark: '#142740', deep: '#0E1D31', light: '#2E5383' },
        brick: { DEFAULT: '#B5432F', dark: '#93341F', light: '#D4664F' },
        brass: { DEFAULT: '#C8963E', dark: '#8A6420', light: '#E2BE7A' },
        muted: '#4F5D70',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(31, 58, 95, 0.06), 0 14px 30px -16px rgba(31, 58, 95, 0.35)',
        lift: '0 2px 0 rgba(31, 58, 95, 0.08), 0 22px 40px -18px rgba(31, 58, 95, 0.45)',
        pin: '0 6px 12px -4px rgba(14, 29, 49, 0.45)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'pin-drop': {
          from: { opacity: '0', transform: 'translate(-50%, -130%)' },
          to: { opacity: '1', transform: 'translate(-50%, -100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'draw-route': { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
        'ken-burns': { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.08)' } },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 600ms ease-out both',
        'pin-drop': 'pin-drop 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        'ken-burns': 'ken-burns 7s ease-out both',
      },
    },
  },
  plugins: [],
};
export default config;
