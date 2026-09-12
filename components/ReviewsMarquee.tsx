import { reviewsByRecency } from '@/content/reviews';

/**
 * Marquesina de reseñas (HANDOFF §7.2).
 *
 * Reseñas reales de Google, ordenadas de más reciente a más vieja. La lista va
 * duplicada y la pista se traslada -50%: así el loop es continuo y no se ve el
 * corte. La segunda copia va aria-hidden para que el lector de pantalla no lea
 * todo dos veces.
 *
 * Sin avatar: las fotos de los autores solo se pueden obtener por la API de
 * Places, y un círculo con iniciales en su lugar leía como un hueco vacío.
 *
 * La duración se calcula a partir de la cantidad de reseñas (`--n`): con una
 * duración fija, sumar reseñas ensancha la pista y el texto pasa demasiado
 * rápido para leerlo. Atada al conteo, la velocidad de lectura queda igual con
 * 6 reseñas que con 36 (~35 px/s).
 *
 * Pausa en hover solo en desktop. Con prefers-reduced-motion la animación se
 * corta y el viewport pasa a scroll horizontal manual (globals.css).
 */
export function ReviewsMarquee() {
  const loop = [
    ...reviewsByRecency.map((r, i) => ({ r, i, clone: false })),
    ...reviewsByRecency.map((r, i) => ({ r, i, clone: true })),
  ];

  return (
    <>
      <p className="container-sl mt-8 font-display text-[17px] text-ink lg:mt-10 lg:text-[19px]">
        Algunas de nuestras reseñas de pacientes
      </p>

      <div className="marquee-viewport mt-4 overflow-hidden py-1.5 lg:mt-5">
        <div
          className="marquee-track"
          style={{ '--n': reviewsByRecency.length } as React.CSSProperties}
        >
          {loop.map(({ r, i, clone }) => (
            <figure
              key={`${r.name}-${clone ? 'b' : 'a'}-${i}`}
              aria-hidden={clone || undefined}
              className="card m-0 flex w-[296px] shrink-0 flex-col p-[22px] lg:w-[394px] lg:p-7"
            >
              <div className="flex items-start gap-3">
                <div>
                  <div className="font-display text-[15px] text-ink lg:text-[17px]">{r.name}</div>
                  <div className="mt-0.5 text-[12.5px] text-muted2 lg:mt-[3px] lg:text-[13.5px]">
                    {r.when}
                  </div>
                </div>
                {/* #8a6508 da 5.0:1 sobre blanco. No volver a #b8860b: queda en 3.3:1 (§3). */}
                <span
                  className="ml-auto shrink-0 text-[14px] tracking-[0.06em] text-star lg:text-[15px]"
                  aria-label={`${r.rating} de 5 estrellas`}
                >
                  <span aria-hidden="true">{'★'.repeat(r.rating)}</span>
                </span>
              </div>

              <blockquote className="t-review m-0 mt-4 text-body">{r.text}</blockquote>

              {/* Google pide atribución al mostrar sus reseñas. Ocupa el lugar que
                  el diseño reservaba a profesional + tratamiento, que Google no da. */}
              <figcaption className="mt-auto pt-5 text-[13px] text-muted2 lg:text-[13.5px]">
                Reseña de Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
