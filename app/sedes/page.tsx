import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { PageHero } from '@/components/Section';
import { HoursList } from '@/components/Cards';
import { MapEmbed, PhotoFrame } from '@/components/Photo';
import { JsonLd, dentistSchema } from '@/lib/jsonld';
import { sedes } from '@/content/sedes';
import { links } from '@/content/site';

export const metadata: Metadata = {
  title: 'Sedes',
  description:
    'Smile Lab tiene dos sedes en Córdoba: General Paz (Gral. Román Deheza 158) y Nueva Córdoba (Av. Ambrosio Olmos 782). Horarios, teléfonos y cómo llegar.',
  alternates: { canonical: '/sedes' },
};

export default function SedesPage() {
  return (
    <div className="container-sl section-first">
      <PageHero
        kicker="Elegí tu sede"
        title="Dos sedes para atenderte mejor."
        body="Cada sede tiene su WhatsApp directo. Elegí la que te quede más cómoda — en ambas trabajamos con el mismo cuidado."
        titleClass="max-w-[20ch]"
      />

      <div className="mt-10 flex flex-col gap-[18px] lg:mt-[52px]">
        {sedes.map((sede) => (
          <div
            key={sede.slug}
            id={sede.slug}
            className="card grid overflow-hidden rounded-aside lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          >
            <div className="flex flex-col p-6 lg:p-9">
              <div className="t-kicker-card">{sede.zone}</div>
              <h2 className="t-h2-panel mt-3">{sede.name}</h2>
              <p className="mt-3 text-[15.5px] leading-[1.65] text-muted">
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

              <div className="t-label mt-5 font-display">Horarios</div>
              <HoursList hours={sede.hours} />

              <div className="cta-group mt-6">
                <Button href={sede.maps} external variant="ghost" size="sm">
                  Cómo llegar
                </Button>
                <Button href={links.agenda} external size="sm">
                  Sacar turno
                </Button>
                <Button href={sede.wa} external variant="ghost" size="sm">
                  WhatsApp →
                </Button>
              </div>
            </div>

            <div className="flex flex-col">
              <PhotoFrame
                src={sede.photoWide}
                alt={sede.photo.alt}
                ratio="16/9"
                sizes="(min-width: 1024px) 620px, 100vw"
              />
              <MapEmbed
                src={sede.embed}
                title={`Mapa de ${sede.name}`}
                className="min-h-[220px] flex-1 lg:min-h-[260px]"
              />
            </div>
          </div>
        ))}
      </div>

      <JsonLd data={sedes.map(dentistSchema)} />
    </div>
  );
}
