import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light';
type ButtonSize = 'md' | 'lg' | 'sm';

const base =
  'inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-xl font-sans font-semibold uppercase tracking-[0.08em] transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brick text-white shadow-card hover:bg-brick-dark hover:shadow-lift',
  secondary: 'border-2 border-navy bg-paper-light text-navy hover:bg-navy hover:text-paper-light',
  ghost: 'text-navy underline-offset-4 hover:bg-navy/5 hover:underline',
  light: 'border-2 border-paper/70 bg-paper/10 text-paper backdrop-blur-sm hover:bg-paper hover:text-navy',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-3 text-xs',
  md: 'min-h-12 px-5 text-sm',
  lg: 'min-h-14 px-7 text-base',
};

/** Dùng chung cho <button> và <Link> để mọi nút trong hành trình cùng một kiểu. */
export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
