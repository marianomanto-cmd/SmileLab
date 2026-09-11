import type { ReactNode } from 'react';

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`t-kicker ${className}`}>{children}</div>;
}

/**
 * Encabezado de sección: kicker + h2 + bajada, con un CTA opcional a la derecha
 * que baja de línea cuando no entra.
 */
export function SectionHeader({
  kicker,
  title,
  body,
  action,
  size = 'lg',
  className = '',
}: {
  kicker: string;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  size?: 'lg' | 'sm';
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-8 ${className}`}>
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className={`mt-4 ${size === 'lg' ? 't-h2-section' : 't-h2-section-sm'} max-w-[26ch]`}>
          {title}
        </h2>
        {body && <p className="t-body mt-4 max-w-[56ch] text-muted">{body}</p>}
      </div>
      {action}
    </div>
  );
}

/** La palabra en itálica dentro de los títulos (HANDOFF §4). */
export function Em({ children, tone }: { children: ReactNode; tone?: 'dark' | 'plain' }) {
  const color =
    tone === 'dark' ? 'text-accent-soft' : tone === 'plain' ? '' : 'text-accent-italic';
  return <span className={`italic font-normal ${color}`}>{children}</span>;
}

/** Cabecera de página interna: kicker + h1 + bajada. */
export function PageHero({
  kicker,
  title,
  body,
  titleClass = 'max-w-[22ch]',
}: {
  kicker: string;
  title: ReactNode;
  body: ReactNode;
  titleClass?: string;
}) {
  return (
    <>
      <Kicker>{kicker}</Kicker>
      <h1 className={`t-h1-page mt-4 lg:mt-[18px] ${titleClass}`}>{title}</h1>
      <p className="t-body-hero mt-4 max-w-[58ch] lg:mt-5">{body}</p>
    </>
  );
}
