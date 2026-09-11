import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Botón pill (HANDOFF §5 + §7.4).
 * Todo botón y link mide al menos 44px de alto — el mínimo táctil de §2.
 */

export type ButtonVariant =
  | 'primary' // accent sobre fondo claro
  | 'secondary' // blanco con borde
  | 'ghost' // sin fondo, solo borde (sobre fondo claro)
  | 'on-dark' // borde claro sobre la banda oscura
  | 'on-dark-accent' // accent sobre la banda oscura (hover más claro)
  | 'ink'; // sólido oscuro, para el CTA con gradiente

type Size = 'lg' | 'sm';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  secondary:
    'bg-surface border border-btn-line text-ink hover:border-accent hover:text-accent-ink',
  ghost: 'border border-btn-line text-ink hover:border-accent hover:text-accent-ink',
  'on-dark': 'border border-dark-line3 text-white hover:border-white',
  'on-dark-accent': 'bg-accent text-on-accent hover:bg-accent-soft',
  ink: 'bg-ink text-white hover:bg-dark-deep',
};

const SIZES: Record<Size, string> = {
  lg: 'px-[26px] py-[15px] text-[15.5px]',
  sm: 'px-[18px] py-3 text-[14.5px]',
};

type Props = {
  href: string;
  variant?: ButtonVariant;
  size?: Size;
  /** `true` para links externos: añade target y rel. */
  external?: boolean;
  block?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;

export function Button({
  href,
  variant = 'primary',
  size = 'lg',
  external = false,
  block = false,
  className = '',
  children,
  ...rest
}: Props) {
  const cls = `btn ${VARIANTS[variant]} ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
