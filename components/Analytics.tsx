'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GA_ID, eventForHref, track } from '@/lib/analytics';

/**
 * GA4 + los tres eventos de conversión del §1.
 *
 * El tracking va por delegación en document, no por un onClick en cada botón:
 * el mismo link aparece en el header, el hero, las cards de sede, el footer y la
 * barra mobile, y así ninguno queda sin medir — ni los que se agreguen después.
 *
 * Sin NEXT_PUBLIC_GA_ID no se carga nada: en dev y en preview el sitio queda limpio.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      const event = eventForHref(href);
      if (!event) return;

      track(event, {
        link_url: href ?? undefined,
        link_text: link.textContent?.trim().slice(0, 100) || undefined,
        page_path: pathname,
      });
    };

    // capture: se registra aunque el link haga preventDefault más arriba.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
