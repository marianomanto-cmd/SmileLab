/**
 * Datos de marca, enlaces externos y navegación.
 * Fuente: HANDOFF §9 «Enlaces externos» + source/Smile Lab.dc.html.
 */

export const site = {
  name: 'Smile Lab',
  legalName: 'Smile Lab Odontología',
  tagline: 'Odontología clara y cercana en Córdoba.',
  description:
    'Coordiná tu turno por WhatsApp y elegí la sede que te quede más cómoda. En Smile Lab acompañamos tu salud bucal con atención profesional, turnos simples y una experiencia más amable desde el primer mensaje.',
  footerBlurb:
    'Odontología clara, cercana y profesional. Clínica odontológica con sedes en General Paz y Nueva Córdoba. Atención para adultos y niños.',
  locale: 'es-AR',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smilelab.com.ar',
  foundingDate: '2019',
} as const;

/** Un único mensaje pre-cargado para todos los links de WhatsApp. */
const WA_TEXT = 'Hola%20Smile%20Lab%2C%20quer%C3%ADa%20hacer%20una%20consulta.';

export const links = {
  agenda:
    'https://479efc53ec346af4e1f5732781c1cbbbf7dde72e.agenda.softwaredentalink.com/agenda?modalidad=1',
  whatsapp: `https://wa.me/5493512584060?text=${WA_TEXT}`,
  whatsappGeneralPaz: `https://wa.me/543516886431?text=${WA_TEXT}`,
  instagram: 'https://www.instagram.com/smilelabargentina/',
  instagramHandle: '@smilelabargentina',
} as const;

export const nav = [
  { label: 'Tratamientos', href: '/tratamientos' },
  { label: 'Pacientes', href: '/pacientes' },
  { label: 'Sedes', href: '/sedes' },
  { label: 'Turnos', href: '/turnos' },
  { label: 'Contacto', href: '/contacto' },
] as const;

/** El menú mobile suma «Para informarte», que en desktop vive en el footer del home. */
export const navMobile = [...nav, { label: 'Para informarte', href: '/para-informarte' }] as const;

export const hoursSummary = [
  'Lun a Vie 9:00 — 19:00',
  'Sáb 9:00 — 13:00',
  'Dom cerrado',
] as const;

export const stats = [
  { value: '2019', label: 'Desde' },
  { value: '02', label: 'Sedes en Córdoba' },
  { value: 'WhatsApp', label: 'Turnos y consultas' },
] as const;
