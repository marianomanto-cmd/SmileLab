import Link from 'next/link';
import { Logo } from './Logo';
import { Button } from './Button';
import { hoursSummary, links, site } from '@/content/site';
import { sedes } from '@/content/sedes';

const columns = [
  {
    title: 'Atención',
    items: [
      { label: 'Tratamientos', href: '/tratamientos' },
      { label: 'Pacientes', href: '/pacientes' },
      { label: 'Sedes', href: '/sedes' },
      { label: 'Turnos', href: '/turnos' },
    ],
  },
  {
    title: 'Recursos',
    items: [
      { label: 'Para informarte', href: '/para-informarte' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Cómo llegar', href: '/sedes' },
    ],
  },
];

/** Los links del footer también respetan el mínimo táctil de 44px (§2). */
const linkCls =
  'inline-flex min-h-11 items-center text-[14.5px] text-footer-link transition-colors hover:text-white';

export function Footer() {
  return (
    <footer className="mt-[clamp(44px,calc(44px+56*(100vw-390px)/790),100px)] bg-dark text-dark-body">
      <div className="container-sl grid gap-10 pb-7 pt-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Logo tone="dark" />
          <p className="mt-[18px] max-w-[42ch] text-[14.5px] leading-[1.7]">{site.footerBlurb}</p>
          <div className="mt-[22px] flex flex-wrap gap-2.5">
            <Button href={links.agenda} external variant="on-dark-accent" size="sm">
              Sacar turno online
            </Button>
            <Button href={links.instagram} external variant="on-dark" size="sm">
              Instagram
            </Button>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="t-label font-display text-footer-label">{col.title}</h4>
            <ul className="mt-1 flex list-none flex-col p-0">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {col.title === 'Recursos' && (
                <li>
                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="t-label font-display text-footer-label">Sedes</h4>
          <ul className="mt-4 flex list-none flex-col gap-3.5 p-0">
            {sedes.map((sede) => (
              <li key={sede.slug}>
                <a
                  href={sede.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-[14.5px] font-semibold text-white"
                >
                  {sede.zone}
                </a>
                <div className="text-[13.5px]">{sede.street}</div>
                <a
                  href={sede.tel}
                  className="inline-flex min-h-11 items-center font-display text-[14.5px] text-footer-link transition-colors hover:text-white"
                >
                  {sede.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-sl flex flex-wrap items-center justify-between gap-4 border-t border-dark-line2 pb-8 pt-5">
        <div className="flex flex-wrap gap-x-[22px] gap-y-1 font-display text-[13px] text-footer-label">
          {hoursSummary.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        <div className="text-[13px] text-footer-label">
          © {new Date().getFullYear()} {site.name}. Córdoba, Argentina.
        </div>
      </div>
    </footer>
  );
}
