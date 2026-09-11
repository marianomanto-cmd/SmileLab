/**
 * Fotos reales de Smile Lab (HANDOFF §10).
 *
 * Los archivos ya vienen recortados por uso y por breakpoint, JPEG calidad 82.
 * next/image los re-encodea a AVIF/WebP y arma el srcset: estos JPEG son el origen.
 *
 * Art direction en runtime SOLO en el masthead: el recorte desktop (1/0.92) y el
 * mobile (1/1.02) son encuadres distintos, no el mismo a distinta escala. El resto
 * de las imágenes usa un único origen y lo resuelve next/image.
 *
 * Los `alt` describen la escena, no el tratamiento.
 */

export type Photo = { src: string; alt: string };

/** Foto con dos recortes: uno por breakpoint. */
export type ArtDirectedPhoto = Photo & { mobile: string };

export const photos = {
  sedeGeneralPaz: {
    src: '/assets/desktop/sedes/general-paz.jpg',
    wide: '/assets/desktop/sedes/general-paz-16x9.jpg',
    alt: 'Recepción de la sede General Paz.',
  },
  sedeNuevaCordoba: {
    src: '/assets/desktop/sedes/nueva-cordoba.jpg',
    wide: '/assets/desktop/sedes/nueva-cordoba-16x9.jpg',
    alt: 'Sillón y equipamiento de un consultorio de la sede Nueva Córdoba.',
  },
  equipoPanel: {
    src: '/assets/desktop/equipo/equipo-panel.jpg',
    alt: 'Las profesionales de Smile Lab en la recepción de la clínica.',
  },
  instrumental: {
    src: '/assets/desktop/articulos/instrumental.jpg',
    alt: 'Odontóloga sosteniendo el instrumental de una limpieza dental.',
  },
  escaneo4x3: {
    src: '/assets/desktop/tratamientos/escaneo-4x3.jpg',
    alt: 'Odontóloga realizando un escaneo intraoral a una paciente.',
  },
  ogImage: '/assets/brand/og-image.jpg',
} as const;

/**
 * Carrusel del masthead (HANDOFF §7.1).
 * 7 slides para 6 fotos: la primera se repite al final para que el loop no salte.
 */
const hero = (file: string, alt: string): ArtDirectedPhoto => ({
  src: `/assets/desktop/hero/${file}.jpg`,
  mobile: `/assets/mobile/hero/${file}.jpg`,
  alt,
});

const heroPhotos: ArtDirectedPhoto[] = [
  hero('equipo-recepcion', 'Equipo de Smile Lab en la recepción de la clínica.'),
  hero('consulta-escaner', 'Consultorio de Smile Lab durante un escaneo intraoral.'),
  hero('sillon-consultorio', 'Sillón y equipamiento de un consultorio de Smile Lab.'),
  hero('recepcion-general-paz', 'Recepción de la sede General Paz.'),
  hero('escaneo-intraoral', 'Odontóloga realizando un escaneo intraoral a una paciente.'),
  hero('equipo-retrato', 'Las profesionales de Smile Lab en el consultorio.'),
];

export const heroSlides: ArtDirectedPhoto[] = [...heroPhotos, heroPhotos[0]];
