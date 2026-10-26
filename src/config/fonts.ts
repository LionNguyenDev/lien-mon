import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google';

export const fontDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});
