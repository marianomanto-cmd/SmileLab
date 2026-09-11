import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { PageHero, Em } from '@/components/Section';
import { MapEmbed } from '@/components/Photo';
import { JsonLd, dentistSchema } from '@/lib/jsonld';
import { sedes } from '@/content/sedes';
import { links } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Escribinos por WhatsApp, reservá en la agenda online o seguinos en Instagram. Mapas y teléfonos de las sedes General Paz y Nueva Córdoba.',
  alternates: { canonical: '/contacto' },
};

const channels = [
  {
    kicker: 'WhatsApp',
    title: 'Escribinos ahora',
    body: 'Consultas, turnos y urgencias.',
    cta: 'Abrir chat →',
    href: links.whatsapp,
    dark: true,
  },
  {
    kicker: 'Agenda online',
    title: 'Reservar solo',
    body: 'Elegí día y horario en pocos clics.',
    cta: 'Ver disponibilidad →',
    href: links.agenda,
    dark: false,
  },
  {
    kicker: 'Instagram',
    title: links.instagramHandle,
    body: 'Casos, novedades y consejos.',
    cta: 'Seguinos →',
    href: links.instagram,
    dark: false,
  },
];

export default function ContactoPage() {
  return (
    <div className="container-sl section-first">
      <PageHero
        kicker="Contacto"
        title={
          <>
            ¿Querés consultar por tu <Em>sonrisa</Em>?
          </>
        }
        body="Escribinos por WhatsApp y coordinamos el turno que mejor se adapte a vos. Te respondemos en minutos en horario de consultorio."
        titleClass="max-w-[20ch]"
      />

      <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:mt-[52px] lg:grid-cols-3">
        {channels.map((c) => (
          <a
            key={c.kicker}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-[200px] flex-col rounded-card p-8 transition-colors ${
              c.dark
                ? 'bg-dark hover:bg-dark-deep'
                : 'card card-link'
            }`}
          >
            <div
              className={`t-label font-display ${c.dark ? 'text-accent' : 'text-muted2'}`}
            >
              {c.kicker}
            </div>
            <h2
              className={`t-h3-sede mt-3.5 ${c.dark ? 'text-white' : ''}`}
            >
              {c.title}
            </h2>
            <p className={`t-card mt-2.5 ${c.dark ? 'text-dark-body' : 'text-muted'}`}>{c.body}</p>
            <span
              className={`mt-auto pt-5 text-sm font-semibold ${
                c.dark ? 'text-white' : 'text-accent-ink'
              }`}
            >
              {c.cta}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-[18px] grid gap-[18px] md:grid-cols-2">
        {sedes.map((sede) => (
          <div key={sede.slug} className="card overflow-hidden">
            <MapEmbed
              src={sede.embed}
              title={`Mapa de ${sede.name}`}
              className="h-[220px] lg:h-[250px]"
            />
            <div className="p-6 lg:p-8">
              <div className="t-kicker-card">{sede.zone}</div>
              <h2 className="t-h3-sede mt-3">{sede.name}</h2>
              <p className="mt-2.5 text-[15.5px] leading-[1.65] text-muted">
                {sede.street}
                <br />
                {sede.barrio}
              </p>
              <a
                href={sede.tel}
                className="link-quiet t-sede-phone inline-flex min-h-11 w-fit items-center"
              >
                {sede.phone}
              </a>
              <div className="cta-group mt-4">
                <Button href={sede.maps} external variant="ghost" size="sm">
                  Cómo llegar
                </Button>
                <Button href={sede.wa} external size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <JsonLd data={sedes.map(dentistSchema)} />
    </div>
  );
}
