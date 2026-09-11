'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { links, nav, navMobile } from '@/content/site';

/**
 * Header sticky (HANDOFF §2) + menú mobile (§7.5).
 * El menú hamburguesa muere en lg (≥1024), donde entra la nav completa.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // El menú se cierra al navegar.
  useEffect(() => setOpen(false), [pathname]);

  // §7.5 — cierre con Esc, foco atrapado y scroll del body bloqueado.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line-strong bg-bg/90 backdrop-blur-[12px]">
      <div className="container-sl flex h-[58px] items-center gap-8 lg:h-[76px]">
        <Logo />

        <nav aria-label="Principal" className="ml-auto hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="relative rounded-pill px-[14px] py-[9px] text-[14.5px] font-medium text-body transition-colors hover:bg-nav-hover hover:text-ink"
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[14px] bottom-px h-0.5 rounded-sm bg-accent"
                />
              )}
            </Link>
          ))}
        </nav>

        <Button
          href={links.agenda}
          external
          size="sm"
          className="ml-auto hidden shrink-0 lg:ml-0 lg:inline-flex"
        >
          Sacar turno
        </Button>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Menú'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="-mr-2.5 ml-auto flex h-11 w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span aria-hidden="true" className="block h-[1.5px] w-5 bg-ink" />
          <span aria-hidden="true" className="block h-[1.5px] w-5 bg-ink" />
          <span aria-hidden="true" className="block h-[1.5px] w-[14px] bg-ink" />
        </button>
      </div>

      {/* El overlay se monta en <body> con un portal, NO dentro del <header>.
          El header tiene backdrop-filter, y un elemento con backdrop-filter crea
          un containing block para sus descendientes position:fixed: dentro del
          header, el overlay se resolvía contra la caja de 58px del header en vez
          de contra el viewport y quedaba como una franja de 48px con los links
          tapados por el hero. */}
      {open &&
        createPortal(
          <div
            id="menu-mobile"
            ref={panelRef}
            className="anim-fade fixed inset-x-0 bottom-0 top-[58px] z-40 overflow-y-auto bg-bg px-[18px] py-6 lg:hidden"
          >
            <nav aria-label="Principal" className="flex flex-col">
              {navMobile.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="border-b border-line-strong px-1 py-4 font-display text-[26px] font-light text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button href={links.agenda} external block className="mt-7 text-base">
              Sacar turno online
            </Button>
            <Button href={links.whatsapp} external variant="secondary" block className="mt-2.5 text-base">
              Consultar por WhatsApp
            </Button>
          </div>,
          document.body
        )}
    </header>
  );
}
