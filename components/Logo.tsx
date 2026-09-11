import Link from 'next/link';

/**
 * Marca Smile Lab (HANDOFF §6).
 * El símbolo va SIN texto adentro: a tamaño de header el «SMILE LAB» interno
 * queda por debajo de 8px y es ilegible. El wordmark de al lado cumple esa función
 * y se renderiza nítido porque es texto, no imagen.
 */

type Props = {
  /** `dark` es la variante del footer, sobre #22343a. */
  tone?: 'light' | 'dark';
  className?: string;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 126" aria-hidden="true" className={className}>
      <path
        d="M60 4C75 4 90 6 102 12C112 16 116 28 112 45C106 70 86 100 68 116C63 121 57 121 52 116C34 100 14 70 8 45C4 28 8 16 18 12C30 6 45 4 60 4Z"
        fill="var(--color-brand-violet-light)"
      />
      <path
        d="M8 45C4 28 8 16 18 12C30 6 45 4 60 4C75 4 90 6 102 12C112 16 116 28 112 45L60 118Z"
        fill="var(--color-brand-violet)"
      />
    </svg>
  );
}

export function Logo({ tone = 'light', className = '' }: Props) {
  const dark = tone === 'dark';

  return (
    <Link
      href="/"
      aria-label="Smile Lab Odontología — ir al inicio"
      className={`flex min-h-11 shrink-0 items-center gap-2.5 lg:gap-[13px] ${className}`}
    >
      <LogoMark
        className={dark ? 'h-[36px] w-[34px] lg:h-10 lg:w-[38px]' : 'h-[34px] w-8 lg:h-[42px] lg:w-10'}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[14px] tracking-[0.18em] lg:text-[16.5px] lg:tracking-[0.2em] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          SMILE LAB
        </span>
        <span
          className={`mt-1 font-display text-[7.5px] tracking-[0.28em] lg:mt-[5px] lg:text-[8.5px] lg:tracking-[0.3em] ${
            dark ? 'text-footer-label' : 'text-muted2'
          }`}
        >
          ODONTOLOGÍA
        </span>
      </span>
    </Link>
  );
}
