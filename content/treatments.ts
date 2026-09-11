import { photos } from './photos';

export type Treatment = {
  slug: string;
  num: string;
  name: string;
  /** Se muestra al pie de la card, junto a «Más detalle». */
  meta: string;
  duration: string;
  sessions: string;
  /** Foto de stock (Pexels, licencia libre). Reemplazar por fotos propias de casos. */
  img: string;
  desc: string;
  detail: string;
  flow: { n: string; t: string }[];
};

/** Pexels — licencia libre, uso comercial, sin atribución obligatoria (HANDOFF §10). */
const px = (id: number, ext = 'jpeg') =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=1400`;

export const treatments: Treatment[] = [
  {
    slug: 'limpieza-dental',
    num: '01',
    name: 'Limpieza dental',
    meta: '45 min',
    duration: '45 min',
    sessions: '1 sesión',
    img: px(3881305),
    desc: 'Una consulta preventiva para mantener encías y dientes más saludables.',
    detail:
      'Removemos placa y sarro, revisamos encías y dejamos indicaciones de higiene según tu caso. Es la consulta que más previene tratamientos mayores.',
    flow: [
      { n: '01', t: 'Revisión general y registro del estado de encías.' },
      { n: '02', t: 'Limpieza con ultrasonido y pulido.' },
      { n: '03', t: 'Indicaciones de higiene y próximo control.' },
    ],
  },
  {
    slug: 'endodoncia',
    num: '02',
    name: 'Endodoncia',
    meta: '1—2 sesiones',
    duration: '60—90 min',
    sessions: '1 a 2 sesiones',
    img: px(3946835),
    desc: 'Tratamiento para conservar una pieza dental cuando existe compromiso interno.',
    detail:
      'Cuando la pulpa del diente está afectada, el tratamiento de conducto permite conservar la pieza en lugar de extraerla. Trabajamos con anestesia y control radiográfico.',
    flow: [
      { n: '01', t: 'Diagnóstico con radiografía y prueba de sensibilidad.' },
      { n: '02', t: 'Apertura, limpieza y desinfección del conducto.' },
      { n: '03', t: 'Sellado y restauración de la pieza.' },
    ],
  },
  {
    slug: 'caries-y-restauraciones',
    num: '03',
    name: 'Caries y restauraciones',
    meta: '30—60 min',
    duration: '30—60 min',
    sessions: '1 sesión',
    img: px(6627571),
    desc: 'Soluciones para tratar lesiones por caries y recuperar función y estética.',
    detail:
      'Eliminamos el tejido afectado y restauramos con composite del color de tu diente, cuidando la forma y el contacto con las piezas vecinas.',
    flow: [
      { n: '01', t: 'Diagnóstico de la lesión y plan de restauración.' },
      { n: '02', t: 'Remoción de caries y preparación.' },
      { n: '03', t: 'Restauración con composite y ajuste de mordida.' },
    ],
  },
  {
    slug: 'ortodoncia',
    num: '04',
    name: 'Ortodoncia',
    meta: 'Plan a medida',
    duration: 'Consulta inicial 40 min',
    sessions: 'Controles periódicos',
    img: px(15073697),
    desc: 'Evaluación y planificación para alinear la sonrisa de forma personalizada.',
    detail:
      'Empezamos con un diagnóstico completo para definir la alternativa adecuada. Después de colocar el sistema, los controles son periódicos y breves.',
    flow: [
      { n: '01', t: 'Diagnóstico, registros y objetivos del caso.' },
      { n: '02', t: 'Colocación del sistema elegido.' },
      { n: '03', t: 'Controles periódicos hasta finalizar.' },
    ],
  },
  {
    slug: 'blanqueamiento',
    num: '05',
    name: 'Blanqueamiento',
    meta: '1—2 sesiones',
    duration: '60 min',
    sessions: '1 a 2 sesiones',
    // Ojo: esta es .png, no .jpeg (HANDOFF §10).
    img: px(16212691, 'png'),
    desc: 'Tratamiento estético supervisado para mejorar el tono dental.',
    detail:
      'Antes de blanquear revisamos que no haya caries ni sensibilidad activa. El tratamiento es supervisado en consultorio, con indicaciones para mantener el resultado.',
    flow: [
      { n: '01', t: 'Control previo y registro del tono inicial.' },
      { n: '02', t: 'Aplicación supervisada en consultorio.' },
      { n: '03', t: 'Indicaciones de mantenimiento.' },
    ],
  },
  {
    slug: 'odontopediatria',
    num: '06',
    name: 'Odontopediatría',
    meta: 'Niños',
    duration: '30—45 min',
    sessions: 'Según el caso',
    img: px(8260438),
    desc: 'Acompañamiento odontológico para niños, con paciencia y cuidado.',
    detail:
      'La primera visita es para que el chico conozca el consultorio sin apuro. Trabajamos con las familias en hábitos de higiene y prevención.',
    flow: [
      { n: '01', t: 'Primera visita de reconocimiento, sin procedimientos.' },
      { n: '02', t: 'Control y prevención según la edad.' },
      { n: '03', t: 'Pautas de higiene para la familia.' },
    ],
  },
];

/** Foto propia que acompaña el aside del detalle de tratamiento (recorte 4/3). */
export const treatmentAside = photos.escaneo4x3;

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);

export const otherTreatments = (slug: string) =>
  treatments.filter((t) => t.slug !== slug).slice(0, 3);
