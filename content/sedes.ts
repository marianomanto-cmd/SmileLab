import { photos } from './photos';

export type Sede = {
  slug: string;
  zone: string;
  name: string;
  street: string;
  barrio: string;
  phone: string;
  tel: string;
  /** 16/10 — card de sede. */
  photo: { src: string; alt: string };
  /** 16/9 — vista /sedes. */
  photoWide: string;
  maps: string;
  embed: string;
  wa: string;
  /** Coordenadas para el JSON-LD (HANDOFF §11). */
  geo?: { lat: number; lng: number };
  hours: { day: string; time: string }[];
};

const HOURS = [
  { day: 'Lunes a Viernes', time: '9:00 — 19:00' },
  { day: 'Sábados', time: '9:00 — 13:00' },
  { day: 'Domingos', time: 'Cerrado' },
];

const WA_TEXT = 'Hola%20Smile%20Lab%2C%20quer%C3%ADa%20hacer%20una%20consulta.';

export const sedes: Sede[] = [
  {
    slug: 'general-paz',
    zone: 'General Paz',
    name: 'Smile Lab General Paz',
    street: 'Gral. Román Deheza 158',
    barrio: 'Barrio General Paz, Córdoba',
    phone: '0351 688-6431',
    tel: 'tel:+543516886431',
    photo: { src: photos.sedeGeneralPaz.src, alt: photos.sedeGeneralPaz.alt },
    photoWide: photos.sedeGeneralPaz.wide,
    maps: 'https://www.google.com/maps/search/?api=1&query=Smile+Lab+General+Paz+Cordoba',
    embed:
      'https://www.google.com/maps?q=Gral.+Rom%C3%A1n+Deheza+158,+C%C3%B3rdoba,+Argentina&z=16&output=embed',
    wa: `https://wa.me/543516886431?text=${WA_TEXT}`,
    hours: HOURS,
  },
  {
    slug: 'nueva-cordoba',
    zone: 'Nueva Córdoba',
    name: 'Smile Lab Nueva Córdoba',
    street: 'Av. Ambrosio Olmos 782',
    barrio: 'Barrio Nueva Córdoba, Córdoba',
    phone: '0351 15-258-4060',
    tel: 'tel:+5493512584060',
    photo: { src: photos.sedeNuevaCordoba.src, alt: photos.sedeNuevaCordoba.alt },
    photoWide: photos.sedeNuevaCordoba.wide,
    maps: 'https://www.google.com/maps/place/Smile+Lab+Nueva+Cordoba/@-31.430742,-64.1898147,17z',
    embed:
      'https://www.google.com/maps?q=Av.+Ambrosio+Olmos+782,+C%C3%B3rdoba,+Argentina&z=16&output=embed',
    wa: `https://wa.me/5493512584060?text=${WA_TEXT}`,
    geo: { lat: -31.430742, lng: -64.1898147 },
    hours: HOURS,
  },
];
