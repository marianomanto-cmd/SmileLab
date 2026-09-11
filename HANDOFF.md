# Smile Lab Odontología — Handoff de diseño → código

Paquete completo para reconstruir el sitio en producción. Todo lo que está acá fue medido sobre los archivos de diseño que se entregan en `source/`, no es aproximado.

- `source/Smile Lab.dc.html` — diseño desktop, 9 vistas navegables. Se abre directo en el navegador.
- `source/Smile Lab Mobile.dc.html` — diseño mobile (390×844 dentro de un marco de teléfono).
- `screenshots/` — desktop scrolleado, vistas internas y mobile (incluye el menú abierto).
- `assets/` — imágenes ya recortadas para desktop y mobile + logo vectorial + máscara del masthead.

---

## 1. Stack recomendado

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Sitio mayormente estático con SEO local fuerte ("odontólogo Córdoba", "dentista Nueva Córdoba"). SSG + metadata API + sitemap nativo. |
| Estilos | **Tailwind CSS v4** con los tokens de la sección 3 en `@theme` | El diseño es utilitario y repetitivo (cards, pills, kickers). Evita un design system prematuro. |
| Tipografías | **`next/font/google`** (Jost, Hanken Grotesk) | Self-hosting automático, sin CLS, sin request a fonts.googleapis.com. |
| Imágenes | **`next/image`** con los assets de `assets/` | AVIF/WebP + srcset. Los recortes ya están hechos, no hace falta art-direction en runtime salvo el masthead. |
| Animación | **CSS puro** (`@keyframes`, sección 7) | Las tres animaciones del sitio son declarativas. No sumar Framer Motion por esto. |
| Contenido | **Datos tipados en `/content/*.ts`** para el lanzamiento | 6 tratamientos, 3 artículos, 2 sedes, 6 reseñas. Si más adelante quieren editar sin deploy: **Sanity** (schema simple) o **Payload** si prefieren self-hosted. |
| Formularios | **Ninguno** | Todo el funnel es WhatsApp + agenda externa (Dentalink). No construir formulario propio. |
| Deploy | **Vercel** | ISR para el blog, preview por PR. |
| Analítica | GA4 + eventos en los CTA (`wsp_click`, `agenda_click`, `sede_maps_click`) | Es la única métrica de conversión: no hay checkout. |

**Lo que NO hace falta:** state manager global, i18n, auth, base de datos, CMS headless en la v1.

### Estructura de rutas

```
/                         Home
/tratamientos             Índice de tratamientos
/tratamientos/[slug]      Detalle (6 slugs, ver §9)
/pacientes                Adultos y niños
/sedes                    General Paz + Nueva Córdoba
/turnos                   Cómo pedir turno
/contacto                 WhatsApp / agenda / Instagram + mapas
/para-informarte          Índice de artículos
/para-informarte/[slug]   Artículo (3 slugs, ver §9)
```

En el diseño la navegación es client-side con estado (`{page, slug}`) y `window.scrollTo(0,0)` en cada cambio. En producción son rutas reales; mantener el reset de scroll (Next lo hace por defecto).

---

## 2. Grilla y layout

### Desktop

| Propiedad | Valor |
|---|---|
| Contenedor | `max-width: 1180px; margin: 0 auto; padding: 0 28px` |
| Header | `height: 76px`, sticky top 0, `z-index: 50` |
| Header fondo | `rgba(246,250,250,0.9)` + `backdrop-filter: blur(12px)` |
| Header borde | `border-bottom: 1px solid #e2eeef` |
| Ritmo entre secciones | `padding-top: 100px` (hero `80px`, banda de pilares `68px`) |
| Gap entre cards | `18px` |
| Gap entre columnas | `40px` (hero) · `56–60px` (texto + aside) |
| Grilla tratamientos / artículos | `repeat(3, minmax(0,1fr))` |
| Grilla sedes | `repeat(2, minmax(0,1fr))` |
| Grilla pasos (banda oscura) | `repeat(4, minmax(0,1fr))`, gap 20px |
| Hero | `grid-template-columns: minmax(0,1fr) minmax(0,1.3fr)`, `align-items: center` |

**Importante — el masthead sangra:** la columna de la foto lleva `margin-right: -88px` y el wrapper raíz `overflow-x: hidden`. El diamante se corta contra el borde derecho de la ventana. No reemplazar por un `calc()` con `vw`: en anchos de viewport medianos deja de sangrar.

### Mobile

| Propiedad | Valor |
|---|---|
| Ancho de diseño | 390px (iPhone 14/15) |
| Padding lateral | `18px` |
| Barra de estado (mock) | 46px — **no es UI**, es el marco del mockup |
| Header | `58px`, sticky, mismo fondo y blur que desktop |
| Barra inferior de acciones | fija, `padding: 12px 18px 22px`, dos botones `flex: 1` |
| Target táctil mínimo | **44px** en todo link y botón (incluye los `tel:` de sedes y los links del footer) |
| Menú | overlay a pantalla completa debajo del header, links `Jost 26px/300`, `padding: 16px 4px`, separados por `1px solid #e2eeef` |

### Breakpoints sugeridos (el diseño define 390 y ≥1180)

```
sm  ≥ 640   1 col → cards a 2 col en tratamientos/artículos
md  ≥ 768   sedes a 2 col; hero sigue apilado
lg  ≥ 1024  hero a 2 col; nav completa (el menú hamburguesa muere acá)
xl  ≥ 1180  contenedor tope; tipografía al escalón desktop completo
```

Entre 390 y 1024 todo apila en una columna y la tipografía interpola entre la escala mobile y desktop.

---

## 3. Color

Tokens exactos, tal como están en el diseño.

### Base

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#f6fafa` | Fondo de página |
| `surface` | `#ffffff` | Cards, asides, paneles |
| `border` | `#e6f1f1` | Borde de card |
| `border-strong` | `#e2eeef` | Separadores de sección, borde del header, filas de FAQ |
| `border-soft` | `#eef5f5` | Filas de horarios dentro de una card |
| `photo-placeholder` | `#cfe6e6` | Fondo del contenedor de imagen mientras carga |

### Tinta

| Token | Hex | Contraste sobre `#f6fafa` | Uso |
|---|---|---|---|
| `ink` | `#22343a` | 12.6:1 | Títulos, números de stat |
| `body` | `#51666b` | 6.1:1 | Cuerpo de texto |
| `muted` | `#5f7276` | 5.1:1 | Copy secundario en cards |
| `muted-2` | `#5d7075` | 5.3:1 | Labels, metadatos |

### Acento (verde agua de marca)

| Token | Hex | Uso |
|---|---|---|
| `accent` | `#8cc3c8` | Fondo de botón primario |
| `accent-hover` | `#6fb0b7` | Hover de botón primario |
| `accent-soft` | `#bfdfe0` | Banda de WhatsApp, logo placeholder |
| `accent-pale` | `#cfe6e6` | Gradiente del CTA, fondo de foto |
| `accent-deep` | `#a9d3d5` | Final del gradiente del CTA |
| `accent-ink` | `#3c757c` | Kickers, links, labels de acción (4.9:1 sobre bg) |
| `accent-italic` | `#4d9199` | Palabra en itálica dentro de los títulos |
| `nav-hover` | `#e7f3f4` | Fondo del link de nav en hover |
| `on-accent` | `#1b2c31` | Texto sobre `accent` (9.8:1) |

### Banda oscura (sección "Cómo funciona" + footer)

| Token | Hex | Uso |
|---|---|---|
| `dark` | `#22343a` | Fondo |
| `dark-ink` | `#ffffff` | Títulos |
| `dark-body` | `#b9cbce` | Cuerpo (7.2:1 sobre `dark`) |
| `dark-border` | `#3a4d53` | Línea sobre cada paso |
| `dark-border-2` | `#2e4046` | Separador del footer |
| `dark-border-3` | `#46595f` | Borde de botón secundario en oscuro |
| `footer-link` | `#d3e2e4` | Links del footer |
| `footer-label` | `#9cb2b6` | Labels de columna, copyright |

### Marca (logo)

| Token | Hex | Uso |
|---|---|---|
| `brand-violet` | `#7d8ac8` | Cara superior del diamante |
| `brand-violet-light` | `#b3bce7` | Facetas inferiores |

### Reseñas

| Token | Hex | Uso |
|---|---|---|
| `star` | `#8a6508` | ★★★★★ (5.0:1 sobre blanco — **no volver a `#b8860b`**, queda en 3.3:1) |
| `avatar-bg` | `#dcecec` | Círculo de iniciales |
| `avatar-ink` | `#2b5f65` | Iniciales |

**Regla de contraste:** todo texto ≥ 4.5:1 contra su fondo real. Los títulos de 36px+ pueden bajar a 3:1 pero en este diseño ninguno lo necesita.

---

## 4. Tipografía

Dos familias, de Google Fonts.

```ts
// app/fonts.ts
import { Jost, Hanken_Grotesk } from 'next/font/google';

export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

export const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});
```

- **Jost** → títulos, display, kickers, números, cifras de horario, preguntas de FAQ, nombres en reseñas, wordmark.
- **Hanken Grotesk** → cuerpo, copy de cards, botones, nav, footer.

`-webkit-font-smoothing: antialiased` en `body`. `text-wrap: pretty` global (evita viudas en los títulos de 3–4 líneas).

### Escala desktop

| Rol | Familia | Tamaño | Line-height | Peso | Letter-spacing |
|---|---|---|---|---|---|
| H1 hero | Jost | 62px | **1.05** | 300 | −0.02em |
| H1 páginas internas | Jost | 54px | **1.06** | 300 | −0.02em |
| H1 detalle de tratamiento | Jost | 48px | **1.08** | 300 | −0.02em |
| H1 artículo | Jost | 46px | **1.08** | 300 | −0.02em |
| H2 sección | Jost | 42px | **1.12** | 300 | −0.005em |
| H2 sección chica | Jost | 40px | **1.12** | 300 | −0.005em |
| H2 panel | Jost | 36px | **1.15** | 300 | −0.005em |
| H2 dentro de artículo | Jost | 26px | **1.25** | 400 | −0.005em |
| H3 card de sede | Jost | 24px | **1.25** | 400 | — |
| H3 card de tratamiento | Jost | 22px | **1.25** | 400 | — |
| H3 card de artículo / pilar | Jost | 21px | **1.3** | 400 | — |
| H3 paso / experiencia | Jost | 19px | **1.3** | 400 | — |
| Kicker de sección | Jost | 11.5px | 1 | 400 | **0.26em**, uppercase |
| Kicker de card | Jost | 11px | 1 | 400 | **0.24em**, uppercase |
| Label de dato | Jost | 11px | 1 | 400 | **0.2em**, uppercase |
| Lead del hero | Jost | 20px | **1.5** | 400 | — |
| Cifra de stat | Jost | 27px | 1 | 300 | — |
| Pregunta de FAQ | Jost | 18.5px | 1 | 400 | — |
| Nombre en reseña | Jost | 17px | 1 | 400 | — |
| Teléfono de sede | Jost | 17–18px | 1 | 400 | — |
| Cuerpo hero | Hanken | 18px | **1.7** | 400 | — |
| Cuerpo sección | Hanken | 17px | **1.7** | 400 | — |
| Cuerpo de artículo | Hanken | 17px | **1.85** | 400 | — |
| Bajada de artículo | Hanken | 19px | **1.7** | 400 | — |
| Copy de card | Hanken | 15px | **1.6** | 400 | — |
| Copy de card (denso) | Hanken | 14.5px | **1.65** | 400 | — |
| Reseña | Hanken | 15.5px | **1.7** | 400 | — |
| Fila de horario | Hanken | 14.5px | 1 | 400 | — |
| Link de nav | Hanken | 14.5px | 1 | **500** | — |
| Botón grande | Hanken | 15.5px | 1 | **600** | — |
| Botón chico | Hanken | 14.5px | 1 | **600** | — |
| Link de acción en card | Hanken | 13.5px | 1 | **600** | — |
| Cuerpo del footer | Hanken | 14.5px | **1.7** | 400 | — |

### Escala mobile

| Rol | Familia | Tamaño | Line-height | Peso |
|---|---|---|---|---|
| H1 | Jost | 36px | **1.1** | 300 |
| H2 sección | Jost | 28px | **1.15** | 300 |
| H3 card de sede | Jost | 21px | **1.25** | 400 |
| H3 card | Jost | 19px | **1.25** | 400 |
| H3 paso | Jost | 17px | **1.3** | 400 |
| Link del menú | Jost | 26px | 1 | 300 |
| Kicker | Jost | 10.5px | 1 | 400, **0.24em** |
| Lead | Jost | 17px | **1.5** | 400 |
| Cifra de stat | Jost | 22px | 1 | 300 |
| Pregunta de FAQ | Jost | 16.5px | 1 | 400 |
| Cuerpo | Hanken | 15.5px | **1.7** | 400 |
| Copy de card | Hanken | 14.5px | **1.6** | 400 |
| Reseña | Hanken | 14.5px | **1.7** | 400 |
| Botón | Hanken | 16px | 1 | **600** |
| Botón de barra inferior | Hanken | 15px | 1 | **600** |

**Mínimo:** nada por debajo de 14px en cuerpo (los 10.5–11px son solo kickers en mayúsculas con tracking abierto, y siempre acompañan a un título).

---

## 5. Formas, bordes y sombras

| Elemento | Valor |
|---|---|
| Pill (botón, chip, link de nav) | `border-radius: 999px` |
| Panel grande (banda oscura, CTA, panel de equipo) | `28px` |
| Card (tratamiento, sede, artículo) | `22px` |
| Card chica (pilar, experiencia, dato) | `20px` / `18px` |
| Aside sticky | `24px` |
| Mapa embebido | `16px` (desktop en home), `14px` (mobile) |
| Card mobile | `18px` |
| Avatar de reseña | `50%` |
| Borde de card | `1px solid #e6f1f1` |
| Sombra en hover de card | `0 16px 34px -22px rgba(34,52,58,0.4)` |
| Padding de card | `26–28px` desktop · `20–22px` mobile |
| Padding de panel | `50px` (panel de equipo) · `58px 50px` (banda oscura) · `70px 50px` (CTA) |
| Padding de botón grande | `15px 26px` |
| Padding de botón chico | `11px 18px` / `12px 18px` |
| Padding de link de nav | `9px 14px` |

### Textura del CTA final

```css
background: linear-gradient(160deg, #cfe6e6 0%, #a9d3d5 100%);
/* capa encima, position:absolute inset:0 */
background: repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 14px, transparent 14px 28px);
```
En mobile el rayado va a `0 12px, transparent 12px 24px`.

---

## 6. Logo y marco del masthead

El logo es un diamante/diente de dos tonos con el wordmark al lado. Está vectorizado en `assets/brand/`:

- `logo-mark.svg` — solo la marca, viewBox `0 0 120 126`.
- `logo-lockup.svg` — marca + "SMILE LAB / ODONTOLOGIA".
- `mask-diente.svg` — la silueta del **marco del masthead** (no es el logo; ver más abajo).

**Paths (los dos que componen la marca):**

```
Silueta   M60 4C75 4 90 6 102 12C112 16 116 28 112 45C106 70 86 100 68 116C63 121 57 121 52 116C34 100 14 70 8 45C4 28 8 16 18 12C30 6 45 4 60 4Z   fill #b3bce7
Cara sup. M8 45C4 28 8 16 18 12C30 6 45 4 60 4C75 4 90 6 102 12C112 16 116 28 112 45L60 118Z                                                        fill #7d8ac8
```

Tamaños en uso: **40×42px** en el header desktop, **38×40px** en el footer, **32×34px** en el header mobile, **34×36px** en el footer mobile. Mismo tratamiento en header y footer: el símbolo a dos tonos + el wordmark en texto al lado, sin cambios de color entre uno y otro.

El wordmark al lado del símbolo es texto, no imagen: `Jost 16.5px / letter-spacing 0.2em / #22343a` sobre `Jost 8.5px / letter-spacing 0.3em / #5d7075` ("ODONTOLOGÍA"), con `margin-top: 5px` entre las dos líneas. En mobile: 14px/0.18em y 7.5px/0.28em.

> El símbolo va **sin texto adentro**. En el original el "SMILE LAB" interno queda por debajo de 8px a los tamaños de header y es ilegible; el wordmark de al lado cumple esa función y se renderiza nítido. Si necesitan la versión con texto interno (redes, favicon grande), usar el lockup a 96px o más.

### Marco del masthead

La foto del hero se recorta con una **silueta de diente** (`assets/brand/mask-diente.svg`). Es una forma propia del marco, distinta del símbolo del logo — no confundirlas.

```html
<svg width="0" height="0" aria-hidden="true" style="position:absolute;pointer-events:none">
  <defs>
    <clipPath id="sl-tooth" clipPathUnits="objectBoundingBox">
      <path d="M0.5 0.105C0.615 0.02 0.795 0.0 0.9 0.1C1.0 0.2 0.985 0.425 0.932 0.585C0.882 0.745 0.832 0.985 0.72 0.982C0.618 0.978 0.578 0.8 0.5 0.72C0.422 0.8 0.382 0.978 0.28 0.982C0.168 0.985 0.118 0.745 0.068 0.585C0.015 0.425 0.0 0.2 0.1 0.1C0.205 0.0 0.385 0.02 0.5 0.105Z"/>
    </clipPath>
  </defs>
</svg>
```

- El SVG de `defs` tiene que estar en el DOM (en el layout, una sola vez) — no sirve referenciar un archivo externo desde `clip-path: url()` en todos los navegadores.
- Contenedor: `aspect-ratio: 1/0.92` en desktop, `1/1.02` en mobile.
- `clipPathUnits="objectBoundingBox"` hace que la forma se estire con el contenedor: respetar esos aspect-ratio o el diente se deforma.

---

## 7. Dinámicas

### 7.1 Carrusel del masthead

6 fotos reales de la clínica rotando en loop, dentro del recorte de diamante.

```css
@keyframes slhero {
  0%,11%          { transform: translateX(0); }
  14.28%,25.28%   { transform: translateX(-14.2857%); }
  28.57%,39.57%   { transform: translateX(-28.5714%); }
  42.85%,53.85%   { transform: translateX(-42.8571%); }
  57.14%,68.14%   { transform: translateX(-57.1428%); }
  71.42%,82.42%   { transform: translateX(-71.4285%); }
  85.71%,100%     { transform: translateX(-85.7142%); }
}
```

- Pista: `display:flex; width:700%; height:100%; animation: slhero 45s cubic-bezier(0.65,0,0.35,1) infinite`.
- Cada slide: `width: 14.2857%; height: 100%; flex-shrink: 0`.
- **7 slides = 6 fotos + la primera repetida al final** para que el loop no salte.
- Cada foto queda quieta ~5s y la transición dura ~1,5s.
- Contenedor: `overflow: hidden` + el `clip-path`.
- La `<img>` va `position:absolute; inset:0; width:100%; height:100%; object-fit:cover` y el slide `position:relative` (ver §8).
- Accesibilidad: envolver en `@media (prefers-reduced-motion: reduce) { animation: none }` y mostrar solo la primera foto.

Orden: `equipo-recepcion` → `consulta-escaner` → `sillon-consultorio` → `recepcion-general-paz` → `escaneo-intraoral` → `equipo-retrato` → (`equipo-recepcion`).

### 7.2 Marquesina de reseñas

```css
@keyframes slmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

- Pista: `display:flex; gap:18px; width:max-content; animation: slmarquee 70s linear infinite`. Mobile: gap 14px, **58s**.
- La lista de 6 reseñas va **duplicada** (12 figuras) y se traslada `-50%`: así el loop es continuo sin salto.
- Card de reseña: `width: 394px` desktop, `296px` mobile.
- **Pausa en hover** (`animation-play-state: paused`) solo en desktop.
- La sección tiene `overflow: hidden` y la banda `padding: 6px 0` para que no se corte la sombra.
- Con `prefers-reduced-motion`: pausar y permitir scroll horizontal manual.

### 7.3 Acordeón de FAQ

- 8 preguntas, **una abierta a la vez**; la primera abierta por defecto (índice 0). Click en la abierta la cierra (índice −1).
- Signo: `+` cerrada / `−` abierta, `19px #3c757c`.
- Botón: ancho completo, `background: none; border: 0`, `padding: 22px 4px` desktop / `18px 2px` mobile con `min-height: 44px`.
- Respuesta: `padding: 0 44px 24px 4px`, entra con `slfade`.

```css
@keyframes slfade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
/* desktop 0.22s ease · mobile 6px / 0.2s */
```

### 7.4 Hover / focus

| Elemento | Estado |
|---|---|
| Link de nav | `background: #e7f3f4; color: #22343a` |
| Nav activo | subrayado `2px` `#8cc3c8`, `left/right: 14px`, `bottom: 1px`, `border-radius: 2px` |
| Botón primario | `#8cc3c8` → `#6fb0b7` (sobre oscuro: → `#bfdfe0`) |
| Botón secundario | borde `#d4e8e9` → `#8cc3c8`, texto → `#3c757c` |
| Card clickeable | borde → `#8cc3c8` + sombra `0 16px 34px -22px rgba(34,52,58,0.4)` |
| Banda de WhatsApp | `#bfdfe0` → `#a9d3d5` |
| Link genérico | `#3c757c` → `#22343a` |
| Link de footer | `#d3e2e4` → `#ffffff` |

Falta y hay que agregarlo en producción: **`:focus-visible`** con `outline: 2px solid #3c757c; outline-offset: 2px` en todo elemento interactivo.

### 7.5 Menú mobile

- Botón hamburguesa 44×44, tres barras (`20px`, `20px`, `14px` × `1.5px`, `#22343a`, gap 5px), `aria-label="Menú"`.
- Abierto: overlay `position:absolute; top:104px; inset-inline:0; bottom:0`, fondo `#f6fafa`, `slfade 0.2s`.
- Cierra al elegir cualquier link. Agregar en producción: `aria-expanded`, cierre con `Esc` y bloqueo de scroll del body.

### 7.6 Mapas

```html
<iframe
  src="https://www.google.com/maps?q=<DIRECCIÓN+URL-ENCODED>,+Córdoba,+Argentina&z=16&output=embed"
  title="Mapa de <sede>" loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"></iframe>
```

Sin API key. Alturas: `210px` (card de home), `250px` (contacto), `flex:1 / min-height:260px` (vista sedes), `180px` (mobile).

---

## 8. Trampa de layout — leer antes de codear las cards

Todo contenedor de imagen con `aspect-ratio` lleva la `<img>` **absoluta**:

```html
<div style="position:relative; flex:0 0 auto; aspect-ratio:16/10; background:#cfe6e6">
  <img src="…" alt="…" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover">
</div>
```

Si la `<img>` queda en flujo con `height:100%`, el porcentaje se resuelve contra una altura que deriva del `aspect-ratio` → referencia circular: la imagen cae a su altura intrínseca y estira el contenedor. Con fotos horizontales casi no se nota; con verticales (varias de las de la clínica lo son) las cards de una misma fila quedan con paneles de alto distinto. `flex:0 0 auto` evita además que el flex column de la card lo crezca.

Aspect-ratios en uso: `16/10` cards de tratamiento y sede (desktop) · `16/9` artículos, sedes (vista detalle), cards mobile · `4/3` aside del detalle de tratamiento · `1/0.92` masthead desktop · `1/1.02` masthead mobile.

---

## 9. Contenido

### Tratamientos (6) — `/tratamientos/[slug]`

| slug | Nombre | Meta | Duración | Sesiones |
|---|---|---|---|---|
| `limpieza-dental` | Limpieza dental | 45 min | 45 min | 1 sesión |
| `endodoncia` | Endodoncia | 1—2 sesiones | 60—90 min | 1 a 2 sesiones |
| `caries-y-restauraciones` | Caries y restauraciones | 30—60 min | 30—60 min | 1 sesión |
| `ortodoncia` | Ortodoncia | Plan a medida | Consulta inicial 40 min | Controles periódicos |
| `blanqueamiento` | Blanqueamiento | 1—2 sesiones | 60 min | 1 a 2 sesiones |
| `odontopediatria` | Odontopediatría | Niños | 30—45 min | Según el caso |

Cada uno tiene: `desc` (1 línea, va en la card), `detail` (párrafo, va en el detalle) y `flow` (3 pasos numerados "Cómo es la consulta"). El copy exacto está en el bloque `TREATMENTS` de `source/Smile Lab.dc.html`. En el detalle, "Sedes: Ambas" es fijo.

### Artículos (3) — `/para-informarte/[slug]`

| slug | Título | Tag | Lectura |
|---|---|---|---|
| `cuanto-dura-una-endodoncia` | ¿Cuánto dura una endodoncia? | Tratamientos | 3 min |
| `como-saber-si-tengo-caries` | ¿Cómo saber si tengo una caries? | Prevención | 4 min |
| `cada-cuanto-hacer-una-limpieza` | ¿Cada cuánto hacer una limpieza? | Prevención | 2 min |

Cada uno: bajada + 3 bloques `{h, p}`. Copy en el bloque `POSTS`.

### Sedes (2)

| | General Paz | Nueva Córdoba |
|---|---|---|
| Dirección | Gral. Román Deheza 158 | Av. Ambrosio Olmos 782 |
| Barrio | Barrio General Paz, Córdoba | Barrio Nueva Córdoba, Córdoba |
| Teléfono | 0351 688-6431 | 0351 15-258-4060 |
| `tel:` | `+543516886431` | `+5493512584060` |
| WhatsApp | `wa.me/543516886431` | `wa.me/5493512584060` |
| Horario | Lun a Vie 9:00—19:00 · Sáb 9:00—13:00 · Dom cerrado | idem |

### Reseñas (6) — **datos de muestra**

Los nombres de pacientes y de profesionales son **inventados** para maquetar. Antes de publicar hay que reemplazarlos por reseñas reales (idealmente traídas de Google Business Profile vía API, con nombre y foto del autor).

Profesionales usados como placeholder: Dra. Josefina Arrieta, Dr. Nicolás Peralta, Dra. Solange Cabrera, Dr. Tomás Bustos, Dra. Agustina Maldonado.

Cada reseña: `name`, `city` (sede), `prof`, `treatment`, `text`, 5 estrellas fijas. El avatar es un círculo con las **iniciales** calculadas del nombre (`#dcecec` / `#2b5f65`) — no hay fotos de pacientes.

### Otros bloques

- **Pilares (3):** Sedes / Turnos simples / Pacientes.
- **Pasos (4):** Elegí día y horario → Confirmás tu turno → Recordatorio previo → Te esperamos en el consultorio.
- **Experiencia (4):** Trato claro / Atención amable / Explicación paso a paso / Pacientes adultos y niños.
- **FAQ (8):** turno, sedes, niños, ortodoncia, urgencia, obras sociales, precio de primera consulta, estacionamiento.
- **Stats del hero:** `2019` Desde · `02` Sedes en Córdoba · `WhatsApp` Turnos y consultas.

### Enlaces externos

| Destino | URL |
|---|---|
| Agenda online (Dentalink) | `https://479efc53ec346af4e1f5732781c1cbbbf7dde72e.agenda.softwaredentalink.com/agenda?modalidad=1` |
| WhatsApp general | `https://wa.me/5493512584060?text=Hola%20Smile%20Lab%2C%20quer%C3%ADa%20hacer%20una%20consulta.` |
| WhatsApp General Paz | `https://wa.me/543516886431?text=Hola%20Smile%20Lab%2C%20quer%C3%ADa%20hacer%20una%20consulta.` |
| Instagram | `https://www.instagram.com/smilelabargentina/` |
| Maps General Paz | `https://www.google.com/maps/search/?api=1&query=Smile+Lab+General+Paz+Cordoba` |
| Maps Nueva Córdoba | `https://www.google.com/maps/place/Smile+Lab+Nueva+Cordoba/@-31.430742,-64.1898147,17z` |

Todos con `target="_blank"` → agregar `rel="noopener noreferrer"` en producción.

---

## 10. Imágenes

### Fotos reales de Smile Lab — en `assets/`

Ya retocadas (redimensionadas, unsharp mask, +4,5% de contraste) y **recortadas por breakpoint**. Listas para usar.

Todas en **JPEG calidad 82**, listas para servir tal cual (el pipeline de `next/image` las va a re-encodear a AVIF/WebP; estos JPEG son el origen).

```
assets/desktop/hero/*.jpg          1160×1067   6 fotos, marco de diente (1/0.92)   ~110-160 KB
assets/mobile/hero/*.jpg            760×775    las mismas 6 (1/1.02)                ~50-90 KB
assets/desktop/sedes/*.jpg         1000×625    16/10, cards de sede                 52-86 KB
assets/desktop/sedes/*-16x9.jpg    1000×563    16/9, vista /sedes                   46-80 KB
assets/mobile/sedes/*.jpg           760×428    16/9                                 31-48 KB
assets/desktop/equipo/*.jpg         900×1100   panel vertical de Equipo/Pacientes  148 KB
assets/mobile/equipo/*.jpg          700×860                                         88 KB
assets/desktop/articulos/*.jpg      900×506    16/9                                 31 KB
assets/mobile/articulos/*.jpg       700×394                                         21 KB
assets/desktop/tratamientos/*.jpg   800×600    4/3, aside del detalle               54 KB
assets/brand/og-image.jpg          1200×630    Open Graph                          142 KB
```

Mapeo:

| Archivo | Dónde va |
|---|---|
| `equipo-recepcion` | Carrusel del hero (slide 1) |
| `consulta-escaner` | Carrusel (slide 2) |
| `sillon-consultorio` | Carrusel (slide 3) · card y detalle de **sede Nueva Córdoba** |
| `recepcion-general-paz` | Carrusel (slide 4) · card y detalle de **sede General Paz** |
| `escaneo-intraoral` | Carrusel (slide 5) · aside del detalle de tratamiento |
| `equipo-retrato` | Carrusel (slide 6) · panel de **Equipo** y de **Pacientes** |
| `instrumental` | Artículo "¿Cada cuánto hacer una limpieza?" |

En `assets/originales/` están las mismas fotos sin recortar (también comprimidas a JPEG 82, entre 75 y 340 KB), por si necesitan otro encuadre.

### Fotos de stock — tratamientos y 2 artículos

Son **Pexels** (licencia libre, uso comercial, sin atribución obligatoria). No se re-hostean acá: se linkean con los parámetros de recorte ya calculados. Si prefieren servirlas desde su propio dominio, descargar el original y pasar por el mismo pipeline de recorte.

| Uso | ID | URL lista (desktop 16/10) |
|---|---|---|
| Limpieza dental | 3881305 | `https://images.pexels.com/photos/3881305/pexels-photo-3881305.jpeg?auto=compress&cs=tinysrgb&w=1000&h=625&fit=crop` |
| Endodoncia | 3946835 | `…/3946835/pexels-photo-3946835.jpeg?auto=compress&cs=tinysrgb&w=1000&h=625&fit=crop` |
| Caries y restauraciones | 6627571 | `…/6627571/pexels-photo-6627571.jpeg?auto=compress&cs=tinysrgb&w=1000&h=625&fit=crop` |
| Ortodoncia | 15073697 | `…/15073697/pexels-photo-15073697.jpeg?auto=compress&cs=tinysrgb&w=1000&h=625&fit=crop` |
| Blanqueamiento | 16212691 | `…/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&w=1000&h=625&fit=crop` |
| Odontopediatría | 8260438 | `…/8260438/pexels-photo-8260438.jpeg?auto=compress&cs=tinysrgb&w=1000&h=625&fit=crop` |
| Artículo endodoncia | 5355924 | `…/5355924/pexels-photo-5355924.jpeg?auto=compress&cs=tinysrgb&w=900&h=506&fit=crop` |
| Artículo caries | 6627838 | `…/6627838/pexels-photo-6627838.jpeg?auto=compress&cs=tinysrgb&w=900&h=506&fit=crop` |

Para mobile cambiar a `w=760&h=428`. Nota: el de blanqueamiento es `.png`, no `.jpeg`.

**Criterio de las fotos de tratamiento:** primer plano de boca/resultado, no escena de consultorio. Cuando haya fotos propias de casos (antes/después, con consentimiento firmado), reemplazan directo estas seis.

### Pendiente de cliente

- Foto propia para ortodoncia y blanqueamiento (antes/después).
- Fotos para los otros dos artículos.
- Reseñas reales con nombre y foto del autor.

### `alt` de cada imagen

Están escritos en el diseño. Regla: describen la escena, no el tratamiento ("Odontóloga realizando un escaneo intraoral a una paciente", no "escaneo"). El SVG del logo lleva `role="img"` + `aria-label="Smile Lab"`; los SVG decorativos y el `defs` del clipPath van `aria-hidden="true"`.

---

## 11. SEO y metadata

- `lang="es-AR"`.
- Title pattern: `<Página> | Smile Lab Odontología — Córdoba`.
- Home description: la bajada del hero.
- **LocalBusiness / Dentist JSON-LD por sede**, con `address`, `geo` (Nueva Córdoba: `-31.430742, -64.1898147`), `openingHoursSpecification`, `telephone`, `sameAs` (Instagram).
- `Article` JSON-LD en los 3 artículos. `Service` en los 6 tratamientos.
- OG image: `assets/brand/og-image.jpg` (1200×630, ya recortada).
- `sitemap.xml` y `robots.txt` con `next-sitemap` o la API nativa.

---

## 12. Checklist de QA

- [ ] Sin scroll horizontal en ningún ancho (el `margin-right: -88px` del hero exige `overflow-x: hidden` en el wrapper).
- [ ] Las 6 cards de tratamiento con el panel de foto de igual alto; las 2 de sede iguales entre sí.
- [ ] Contraste ≥ 4.5:1 en todo texto (ojo con las estrellas: `#8a6508`, no `#b8860b`).
- [ ] Targets táctiles ≥ 44px en mobile, incluidos los `tel:` y los links del footer.
- [ ] `prefers-reduced-motion` cortando carrusel y marquesina.
- [ ] `:focus-visible` visible en nav, botones, cards y FAQ.
- [ ] FAQ operable por teclado (`<button>`, no `<div>`), con `aria-expanded`.
- [ ] Menú mobile: `Esc` cierra, foco atrapado, scroll del body bloqueado.
- [ ] `rel="noopener noreferrer"` en todos los `target="_blank"`.
- [ ] Iframes de Maps con `title` y `loading="lazy"`.
- [ ] El loop del carrusel no salta (7º slide = 1º).
- [ ] La marquesina no muestra corte (lista duplicada, `-50%`).
- [ ] Logo nítido en retina (SVG, no PNG).
- [ ] LCP: la primera foto del carrusel con `priority` / `fetchpriority="high"`; las otras 5 `loading="lazy"`.

---

## 13. Orden de trabajo sugerido

1. Scaffolding Next.js + Tailwind + fonts + tokens de §3 en `@theme`.
2. Layout: header sticky, footer, `defs` del clipPath, contenedor.
3. Primitivas: `Button` (primary/secondary/dark), `Card`, `Kicker`, `SectionHeader`, `Pill`, `PhotoFrame` (el del §8).
4. Home de arriba abajo. El masthead primero — es el que tiene toda la dificultad (clip + carrusel + sangrado).
5. Datos en `/content` y las 8 rutas restantes.
6. Dinámicas: FAQ, marquesina, menú mobile.
7. Pasada de accesibilidad y el checklist de §12.
8. SEO, JSON-LD, sitemap, analítica.

Los dos HTML de `source/` son la referencia de verdad: ante cualquier duda de valor, medir ahí (están todos los estilos inline, se leen directo).
