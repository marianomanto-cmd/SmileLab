/**
 * clipPath del marco del masthead (HANDOFF §6).
 *
 * Es una silueta de DIENTE, propia del marco — no es el símbolo del logo.
 * No confundirlas: el logo es el diamante de dos tonos de <LogoMark />.
 *
 * Tiene que estar en el DOM una sola vez (va en el layout): referenciar un archivo
 * externo desde `clip-path: url()` no funciona en todos los navegadores.
 *
 * `clipPathUnits="objectBoundingBox"` hace que la forma se estire con el contenedor,
 * así que el contenedor debe respetar aspect-ratio 1/0.92 (desktop) o 1/1.02 (mobile)
 * o el diente se deforma.
 */
export function ToothClip() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="pointer-events-none absolute">
      <defs>
        <clipPath id="sl-tooth" clipPathUnits="objectBoundingBox">
          <path d="M0.5 0.105C0.615 0.02 0.795 0.0 0.9 0.1C1.0 0.2 0.985 0.425 0.932 0.585C0.882 0.745 0.832 0.985 0.72 0.982C0.618 0.978 0.578 0.8 0.5 0.72C0.422 0.8 0.382 0.978 0.28 0.982C0.168 0.985 0.118 0.745 0.068 0.585C0.015 0.425 0.0 0.2 0.1 0.1C0.205 0.0 0.385 0.02 0.5 0.105Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
