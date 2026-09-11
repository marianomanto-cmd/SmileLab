import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { PageHero, Em } from '@/components/Section';
import { steps } from '@/content/home';
import { links } from '@/content/site';

export const metadata: Metadata = {
  title: 'Turnos',
  description:
    'Cómo pedir turno en Smile Lab: reservás online o coordinás por WhatsApp en pocos pasos. Te respondemos en minutos en horario de consultorio.',
  alternates: { canonical: '/turnos' },
};

export default function TurnosPage() {
  return (
    <div className="container-sl section-first">
      <PageHero
        kicker="Cómo funciona"
        title={
          <>
            Pedir turno es <Em>simple</Em>.
          </>
        }
        body="Todo lo coordinás por WhatsApp en pocos pasos. Te respondemos en minutos en horario de consultorio."
        titleClass="max-w-[18ch]"
      />

      <ol className="mt-10 grid list-none grid-cols-1 gap-[18px] p-0 sm:grid-cols-2 lg:mt-[52px]">
        {steps.map((step) => (
          <li key={step.num} className="card p-6 lg:p-8">
            <div className="t-label font-display">Paso {step.num}</div>
            <h2 className="t-h3-sede mt-3.5">{step.title}</h2>
            <p className="t-card-wide mt-2.5 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="cta-group mt-9">
        <Button href={links.agenda} external>
          Sacar turno online
        </Button>
        <Button href={links.whatsapp} external variant="secondary">
          Consultar por WhatsApp
        </Button>
      </div>
    </div>
  );
}
