# Smile Lab Odontología

Sitio de la clínica Smile Lab (General Paz y Nueva Córdoba, Córdoba, Argentina),
construido sobre el handoff de diseño `HANDOFF.md`.

Todo el funnel es externo: WhatsApp + agenda de Dentalink. **No hay formularios propios,
base de datos ni auth.**

## Stack

| Capa | Elección |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript, todo estático (SSG) |
| Estilos | Tailwind CSS v4, tokens del §3 en `@theme` |
| Tipografías | `next/font/google` — Jost (display) + Hanken Grotesk (cuerpo) |
| Imágenes | `next/image`, salvo el masthead (ver abajo) |
| Animación | CSS puro (`@keyframes`), sin librerías |
| Contenido | Datos tipados en `/content/*.ts` |
| Deploy | Vercel |

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm start          # servir el build
npm run typecheck  # tsc --noEmit
npm run lint
```

### Variables de entorno

```bash
NEXT_PUBLIC_SITE_URL=https://smilelab.com.ar
```

Se usa para canonicals, Open Graph, `sitemap.xml` y los `@id` del JSON-LD.
Sin ella cae al default de `content/site.ts`. **Ponerla antes del primer deploy**
o los canonicals van a apuntar al dominio equivocado.

## Estructura

```
app/
  layout.tsx              header + footer + barra mobile + clipPath + JSON-LD de Organization
  globals.css             tokens (@theme), escala tipográfica, layout, animaciones
  fonts.ts
  page.tsx                Home
  tratamientos/           índice + [slug] (6)
  pacientes/  sedes/  turnos/  contacto/
  para-informarte/        índice + [slug] (3)
  sitemap.ts  robots.ts  not-found.tsx
components/               Header, Footer, Logo, Button, Cards, Photo, Section,
                          HeroCarousel, ReviewsMarquee, Faq, ToothClip, MobileActionBar
content/                  site, photos, treatments, posts, sedes, reviews, team, home
lib/jsonld.tsx            LocalBusiness/Dentist, Service, Article, FAQPage
public/assets/            fotos recortadas por uso y breakpoint + marca
```

El contenido se edita en `/content`. No hace falta tocar componentes para cambiar copy,
horarios, teléfonos o links.

## Las tres trampas del diseño

Están documentadas en el código, pero conviene saberlas antes de tocar nada:

1. **`§8` — imágenes en contenedores con `aspect-ratio`.** La `<img>` va absoluta
   (`.photo > img` en `globals.css`, y `next/image` con `fill`). Si queda en flujo con
   `height:100%`, las cards de una misma fila terminan con paneles de alto distinto.
2. **`§6` — el `clipPath` del masthead.** Es una silueta de *diente*, distinta del símbolo
   del logo. Vive en el DOM una sola vez (`<ToothClip />` en el layout) porque
   `clip-path: url()` contra un archivo externo no funciona en todos los navegadores.
   El contenedor debe respetar `1/0.92` (desktop) y `1/1.02` (mobile) o se deforma.
3. **`§7.1` / `§7.2` — los loops.** El carrusel tiene 7 slides para 6 fotos (la primera se
   repite al final) y la marquesina duplica las 6 reseñas y se traslada `-50%`. Si se
   cambia la cantidad, hay que recalcular los keyframes.

## Decisiones que se apartan del handoff

- **Masthead con `<picture>` en vez de `next/image`.** El recorte desktop (1160×1067) y el
  mobile (760×775) son encuadres distintos, y `next/image` no hace art direction. Con
  `<source media>` el navegador baja un solo archivo. Los JPEG ya vienen a calidad 82 y al
  tamaño exacto de uso. El resto de las imágenes sí pasa por `next/image`.
- **Separador `/` de los metadatos: `#5d7075` en vez de `#a8c2c4`.** El valor del diseño da
  1.88:1 sobre blanco y el checklist §12 pide ≥4.5:1 en todo texto. Ningún teal claro llega
  al mínimo. Para volver al valor original, cambiar `--color-slash` en `globals.css`.
- **Se agregó lo que §7.4 y §7.5 marcaban como pendiente:** `:focus-visible` en todo
  elemento interactivo, `aria-expanded` en el menú y en el FAQ, cierre con `Esc`, foco
  atrapado y bloqueo de scroll del body.

## Pendiente antes de publicar

- [ ] **Reseñas reales.** Las 6 de `content/reviews.ts` son de muestra: los nombres de
      pacientes y los textos son inventados (los profesionales sí son reales). Reemplazar
      por reseñas de Google Business Profile vía API y poner `REVIEWS_ARE_REAL` en `true`.
      Mientras el flag esté en `false` **no se emite JSON-LD de `Review` ni
      `AggregateRating`**: publicar puntajes inventados como datos estructurados los mete
      en el índice de Google como si fueran reales.
- [ ] **Fotos propias** para ortodoncia, blanqueamiento y dos de los artículos. Hoy son
      stock de Pexels servido desde `images.pexels.com` (§10). Conviene bajarlas y servirlas
      desde el propio dominio: hoy el sitio depende de un CDN de terceros para 8 imágenes.
- [ ] **Confirmar el listado de profesionales** de `content/team.ts`. En el export de
      Dentalink conviven profesionales reales con registros de demo (los de matrícula
      `MP 12.345 / 23.456 / 34.567` son correlativos y quedaron apartados en
      `teamPendingReview`).
- [ ] `NEXT_PUBLIC_SITE_URL` en Vercel.
- [ ] GA4 y los eventos `wsp_click`, `agenda_click`, `sede_maps_click` (§1).

## QA

El checklist del §12 está verificado sobre el build de producción:

- 9 rutas × desktop/mobile sin errores de consola, imágenes rotas ni scroll horizontal
- Sin desbordes ni gutters rotos en 12 anchos (320 → 1920)
- Contraste ≥4.5:1 en todo el texto de las 9 rutas, en ambos viewports
- Todo link y botón ≥44px de alto en mobile
- Menú mobile: `aria-expanded`, `Esc`, foco atrapado, scroll bloqueado, cierra al navegar
- FAQ operable por teclado, una abierta a la vez
- `prefers-reduced-motion` corta carrusel y marquesina
- `rel="noopener noreferrer"` en todos los `target="_blank"`; iframes con `title` y `loading="lazy"`
- LCP: primera foto del carrusel `eager` + `fetchPriority="high"`, las otras cinco `lazy`
