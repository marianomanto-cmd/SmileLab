/**
 * Analítica (HANDOFF §1).
 *
 * No hay checkout: los únicos eventos de conversión del sitio son los tres clics
 * que sacan al usuario hacia el funnel real — WhatsApp, la agenda de Dentalink y
 * el mapa de una sede.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export type ConversionEvent = 'wsp_click' | 'agenda_click' | 'sede_maps_click';

/**
 * Clasifica un href en uno de los tres eventos.
 * Se resuelve por destino y no por un handler en cada botón: así cualquier CTA
 * que se agregue después queda medido sin tocar el tracking.
 */
export function eventForHref(href: string | null | undefined): ConversionEvent | null {
  if (!href) return null;

  if (href.includes('wa.me')) return 'wsp_click';
  if (href.includes('agenda.softwaredentalink.com')) return 'agenda_click';
  if (href.includes('google.com/maps')) return 'sede_maps_click';

  return null;
}

type GtagParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js', target: string, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: ConversionEvent, params: GtagParams = {}) {
  window.gtag?.('event', event, params);
}
