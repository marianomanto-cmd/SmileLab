import { heroSlides } from '@/content/photos';

/**
 * Carrusel del masthead (HANDOFF §7.1).
 *
 * 6 fotos rotando dentro del recorte de diente. La pista tiene 7 slides — la primera
 * foto repetida al final — para que el loop no salte. Cada foto queda quieta ~5s y la
 * transición dura ~1,5s (45s de ciclo).
 *
 * El aspect-ratio del contenedor no es decorativo: el clipPath usa objectBoundingBox,
 * así que con otra proporción el diente se deforma (§6).
 *
 * Acá va <picture> y no next/image a propósito: el recorte desktop (1160×1067, 1/0.92)
 * y el mobile (760×775, 1/1.02) son encuadres DISTINTOS, y next/image no hace art
 * direction. Con <source media> el navegador baja un solo archivo, el que corresponde.
 * Los JPEG ya vienen a calidad 82 y al tamaño exacto de uso.
 *
 * Con prefers-reduced-motion la animación se corta y queda visible solo la primera
 * foto — lo resuelve globals.css, no hace falta JS.
 */
export function HeroCarousel() {
  return (
    <div className="relative aspect-[1/1.02] lg:aspect-[1/0.92]">
      <div
        className="absolute inset-0 overflow-hidden bg-photo"
        style={{ clipPath: 'url(#sl-tooth)' }}
      >
        <div className="hero-track">
          {heroSlides.map((slide, i) => {
            const first = i === 0;

            return (
              <div key={`${slide.src}-${i}`} className="hero-slide">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={slide.src} width={1160} height={1067} />
                  <img
                    src={slide.mobile}
                    /* La 1ª foto es el LCP: eager + alta prioridad. Las otras cinco, lazy. */
                    alt={first ? slide.alt : ''}
                    aria-hidden={first ? undefined : true}
                    width={760}
                    height={775}
                    loading={first ? 'eager' : 'lazy'}
                    fetchPriority={first ? 'high' : 'auto'}
                    decoding={first ? 'sync' : 'async'}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
