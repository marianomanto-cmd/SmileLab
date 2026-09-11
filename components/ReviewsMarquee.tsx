import { initials, reviews } from '@/content/reviews';

/**
 * Marquesina de reseñas (HANDOFF §7.2).
 *
 * La lista de 6 va duplicada (12 figuras) y la pista se traslada -50%: así el loop
 * es continuo y no se ve el corte. La segunda copia va aria-hidden para que el
 * lector de pantalla no lea todo dos veces.
 *
 * Pausa en hover solo en desktop. Con prefers-reduced-motion la animación se corta
 * y el viewport pasa a scroll horizontal manual (globals.css).
 */
export function ReviewsMarquee() {
  const loop = [
    ...reviews.map((r, i) => ({ r, i, clone: false })),
    ...reviews.map((r, i) => ({ r, i, clone: true })),
  ];

  return (
    <div className="marquee-viewport mt-10 overflow-hidden py-1.5">
      <div className="marquee-track">
        {loop.map(({ r, i, clone }) => (
          <figure
            key={`${r.name}-${clone ? 'b' : 'a'}-${i}`}
            aria-hidden={clone || undefined}
            className="card m-0 flex w-[296px] shrink-0 flex-col p-[22px] lg:w-[394px] lg:p-7"
          >
            <div className="flex items-center gap-3 lg:gap-3.5">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-avatar-bg font-display text-sm tracking-[0.04em] text-avatar-ink lg:h-[52px] lg:w-[52px] lg:text-base"
              >
                {initials(r.name)}
              </span>
              <div>
                <div className="font-display text-[15px] text-ink lg:text-[17px]">{r.name}</div>
                <div className="mt-0.5 text-[12.5px] text-muted2 lg:mt-[3px] lg:text-[13.5px]">{r.city}</div>
              </div>
              {/* #8a6508 da 5.0:1 sobre blanco. No volver a #b8860b: queda en 3.3:1 (§3). */}
              <span
                className="ml-auto text-[14px] tracking-[0.06em] text-star lg:text-[15px]"
                aria-label={`${r.rating} de 5 estrellas`}
              >
                <span aria-hidden="true">★★★★★</span>
              </span>
            </div>

            <blockquote className="t-review m-0 mt-5 text-body">{r.text}</blockquote>

            <figcaption className="mt-auto flex items-center justify-between gap-3 pt-5 text-[13px] lg:text-[13.5px]">
              <span className="font-semibold text-accent-ink">{r.prof}</span>
              <span className="font-display text-muted2">{r.treatment}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
