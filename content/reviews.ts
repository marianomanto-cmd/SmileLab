/**
 * Reseñas de pacientes.
 *
 * ⚠️  ESTADO: DATOS DE MUESTRA (sitio FPO).
 *
 * Los nombres de pacientes y los textos vienen del diseño y son inventados para
 * maquetar (HANDOFF §9). Los profesionales SÍ son reales (listado de Dentalink).
 *
 * Antes de que el sitio quede público para pacientes hay que reemplazarlas por
 * reseñas reales de Google Business Profile (nombre y foto del autor vía API) y
 * poner REVIEWS_ARE_REAL en true.
 *
 * Mientras el flag esté en false NO se emite JSON-LD de Review ni AggregateRating:
 * publicar puntajes inventados como datos estructurados los mete en el índice de
 * Google como si fueran reales. La marquesina sí se renderiza — es maqueta visual.
 */

export type Review = {
  name: string;
  city: string;
  prof: string;
  treatment: string;
  text: string;
  /** El diseño fija 5 estrellas; con reseñas reales viene de la API. */
  rating: number;
};

export const REVIEWS_ARE_REAL = false;

export const reviews: Review[] = [
  {
    name: 'Camila Ríos',
    city: 'Nueva Córdoba',
    prof: 'Dra. Agustina Sánchez',
    treatment: 'Limpieza dental',
    rating: 5,
    text: 'Me atendió la Dra. Agustina Sánchez y me explicó todo antes de empezar. Salí de la limpieza sin una sola molestia y con las indicaciones anotadas.',
  },
  {
    name: 'Martín Delgado',
    city: 'General Paz',
    prof: 'Dra. Nicolle Giraud',
    treatment: 'Endodoncia',
    rating: 5,
    text: 'Llegué con dolor un viernes y la Dra. Nicolle Giraud me hizo lugar el mismo día. La endodoncia se resolvió en una sesión y el seguimiento fue por WhatsApp.',
  },
  {
    name: 'Valeria Sosa',
    city: 'Nueva Córdoba',
    prof: 'Dra. Ana Solange Bilinski',
    treatment: 'Ortodoncia',
    rating: 5,
    text: 'Venía postergando la ortodoncia por miedo. La Dra. Ana Solange Bilinski me armó un plan claro, con los tiempos y los controles por escrito desde el primer día.',
  },
  {
    name: 'Federico Luján',
    city: 'General Paz',
    prof: 'Dra. Ana Belén Bertello',
    treatment: 'Caries y restauraciones',
    rating: 5,
    text: 'La Dra. Ana Belén Bertello me mostró las fotos de la pieza antes y después. Se nota que trabajan sin apuro y explicando cada decisión.',
  },
  {
    name: 'Lucía Ferreyra',
    city: 'Nueva Córdoba',
    prof: 'Dra. Ana Solange Bilinski',
    treatment: 'Odontopediatría',
    rating: 5,
    text: 'Llevé a mi hija de cinco años y la Dra. Ana Solange Bilinski le dedicó la primera visita solo a que conociera el consultorio. Ahora va contenta.',
  },
  {
    name: 'Andrés Quiroga',
    city: 'General Paz',
    prof: 'Dra. Agustina Sánchez',
    treatment: 'Blanqueamiento',
    rating: 5,
    text: 'Buen resultado y expectativas realistas: la Dra. Agustina Sánchez me dijo de entrada hasta dónde se podía llegar con mi tono de esmalte.',
  },
];

/** Iniciales para el avatar (no hay fotos de pacientes). */
export const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

/** §7.2 — la lista va duplicada y la pista se traslada -50%: loop sin salto. */
export const reviewsLoop = [...reviews, ...reviews];
