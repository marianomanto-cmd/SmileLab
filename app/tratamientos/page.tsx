import type { Metadata } from 'next';
import { PageHero, Em } from '@/components/Section';
import { TreatmentCard } from '@/components/Cards';
import { JsonLd } from '@/lib/jsonld';
import { treatments } from '@/content/treatments';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Tratamientos',
  description:
    'Limpieza dental, endodoncia, caries y restauraciones, ortodoncia, blanqueamiento y odontopediatría en las dos sedes de Smile Lab en Córdoba.',
  alternates: { canonical: '/tratamientos' },
};

export default function TratamientosPage() {
  return (
    <div className="container-sl section-first">
      <PageHero
        kicker="Tratamientos"
        title={
          <>
            Tratamientos para cuidar y mejorar tu <Em>sonrisa</Em>.
          </>
        }
        body="Tocá cada tarjeta para ver más detalle. Si tenés dudas específicas, consultanos por WhatsApp y te orientamos antes del turno."
      />

      <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:mt-[52px] lg:grid-cols-3">
        {treatments.map((t) => (
          <TreatmentCard key={t.slug} treatment={t} />
        ))}
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Tratamientos de Smile Lab Odontología',
          itemListElement: treatments.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: t.name,
            url: `${site.url}/tratamientos/${t.slug}`,
          })),
        }}
      />
    </div>
  );
}
