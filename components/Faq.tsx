'use client';

import { useState } from 'react';

/**
 * Acordeón de preguntas frecuentes (HANDOFF §7.3).
 * Una abierta a la vez, la primera abierta por defecto. Click en la abierta la cierra.
 * Es <button> real con aria-expanded: operable por teclado (§12).
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-line-strong">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item.q} className="border-b border-line-strong">
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="t-faq-q flex min-h-11 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent px-0.5 py-[18px] text-left font-display text-ink transition-colors hover:text-accent-ink lg:px-1 lg:py-[22px]"
              >
                <span>{item.q}</span>
                <span aria-hidden="true" className="shrink-0 text-[19px] text-accent-ink">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="anim-fade t-card-wide pb-[18px] pl-0.5 pr-6 text-muted lg:pb-6 lg:pl-1 lg:pr-11">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
