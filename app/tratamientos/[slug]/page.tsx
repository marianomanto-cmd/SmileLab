import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { PhotoFrame } from '@/components/Photo';
import { JsonLd, serviceSchema } from '@/lib/jsonld';
import { getTreatment, otherTreatments, treatmentAside, treatments } from '@/content/treatments';
import { links } from '@/content/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return {};

  return {
    title: treatment.name,
    description: treatment.detail,
    alternates: { canonical: `/tratamientos/${treatment.slug}` },
    openGraph: { title: `${treatment.name} | Smile Lab`, description: treatment.detail },
  };
}

export default async function TreatmentPage({ params }: Params) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const others = otherTreatments(slug);

  const facts = [
    { label: 'Duración', value: treatment.duration },
    { label: 'Sesiones', value: treatment.sessions },
    { label: 'Sedes', value: 'Ambas' },
  ];

  return (
    <div className="container-sl pt-7 lg:pt-11">
      <Link
        href="/tratamientos"
        className="link-quiet inline-flex min-h-11 items-center font-display text-xs uppercase tracking-[0.16em]"
      >
        ← Tratamientos
      </Link>

      <div className="mt-4 grid items-start gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div>
          <h1 className="t-h1-treatment">{treatment.name}</h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-body lg:text-[18.5px]">
            {treatment.desc}
          </p>
          <p className="t-body-article mt-5 text-muted">{treatment.detail}</p>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="card rounded-tile p-[22px]">
                <div className="t-label font-display">{fact.label}</div>
                <div className="mt-2 font-display text-[18px] text-ink">{fact.value}</div>
              </div>
            ))}
          </div>

          <h2 className="t-h2-article mt-10 lg:mt-12">Cómo es la consulta</h2>
          <ul className="mt-5 list-none border-t border-line-strong p-0">
            {treatment.flow.map((step) => (
              <li key={step.n} className="flex gap-[18px] border-b border-line-strong py-[18px]">
                <span className="shrink-0 pt-0.5 font-display text-sm text-accent-ink">{step.n}</span>
                <span className="text-base leading-[1.7] text-body">{step.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="card rounded-aside p-6 lg:sticky lg:top-[100px] lg:p-[30px]">
          <PhotoFrame
            src={treatmentAside.src}
            alt={treatmentAside.alt}
            ratio="4/3"
            sizes="(min-width: 1180px) 420px, (min-width: 1024px) 35vw, 100vw"
            className="rounded-tile"
          />
          <h2 className="t-h3-post mt-6">Coordinemos tu turno</h2>
          <p className="t-card mt-2.5 text-muted">
            Elegí día y horario online, o escribinos si preferís consultar antes.
          </p>
          <Button href={links.agenda} external block className="mt-[22px]">
            Sacar turno online
          </Button>
          <Button href={links.whatsapp} external variant="secondary" block className="mt-2.5">
            Consultar por WhatsApp
          </Button>
        </aside>
      </div>

      <div className="mt-14 lg:mt-[88px]">
        <h2 className="font-display text-[28px] font-light leading-[1.2]">Otros tratamientos</h2>
        <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {others.map((t) => (
            <Link
              key={t.slug}
              href={`/tratamientos/${t.slug}`}
              className="card card-link rounded-card-sm p-6"
            >
              <h3 className="t-h3-step">{t.name}</h3>
              <p className="t-card-dense mt-2 text-muted">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <JsonLd data={serviceSchema(treatment)} />
    </div>
  );
}
