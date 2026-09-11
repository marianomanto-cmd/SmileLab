import { links } from '@/content/site';

/**
 * Barra inferior de acciones, solo mobile (HANDOFF §2).
 * Dos botones flex:1, padding 12px 18px 22px, fija al viewport.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-line-strong bg-bg/95 px-[18px] pb-[22px] pt-3 backdrop-blur-[10px] lg:hidden">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn flex-1 border border-btn-line bg-surface py-3.5 text-[15px] text-ink"
      >
        WhatsApp
      </a>
      <a
        href={links.agenda}
        target="_blank"
        rel="noopener noreferrer"
        className="btn flex-1 bg-accent py-3.5 text-[15px] text-on-accent"
      >
        Sacar turno
      </a>
    </div>
  );
}
