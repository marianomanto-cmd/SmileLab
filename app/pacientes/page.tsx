import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { PageHero } from '@/components/Section';
import { experience } from '@/content/home';
import { links } from '@/content/site';
import { photos } from '@/content/photos';

export const metadata: Metadata = {
  title: 'Pacientes',
  description:
    'Atención odontológica para adultos y niños en Córdoba. Explicamos cada paso, respondemos tus consultas y buscamos que cada visita sea tranquila.',
  alternates: { canonical: '/pacientes' },
};

export default function PacientesPage() {
  return (
    <div className="container-sl section-first">
      <PageHero
        kicker="Pacientes"
        title="Atención para adultos y niños."
        body="Sabemos que ir al dentista puede generar dudas. Por eso explicamos cada paso, respondemos tus consultas y buscamos que cada visita sea tranquila."
        titleClass="max-w-[20ch]"
      />

      <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:mt-[52px]">
        {experience.map((e) => (
          <div key={e.title} className="card rounded-card-sm p-6 lg:p-[30px]">
            <h2 className="t-h3-post">{e.title}</h2>
            <p className="t-card-wide mt-2.5 text-muted">{e.body}</p>
          </div>
        ))}
      </div>

      <div className="card mt-[18px] grid items-stretch overflow-hidden rounded-panel lg:grid-cols-2">
        <div className="self-center p-6 lg:p-[50px]">
          <h2 className="t-h2-panel">Odontopediatría con paciencia y cuidado</h2>
          <p className="t-body mt-4 text-muted">
            Atención adaptada a cada edad y momento. Acompañamos a los chicos en su primera visita
            y trabajamos con las familias para que la consulta sea tranquila.
          </p>
          <Button href={links.whatsapp} external className="mt-7">
            Consultar por WhatsApp
          </Button>
        </div>
        <div className="relative min-h-[320px] bg-photo lg:min-h-[400px]">
          <Image
            src={photos.equipoPanel.src}
            alt={photos.equipoPanel.alt}
            fill
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
