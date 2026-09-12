import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Em, Kicker, SectionHeader } from '@/components/Section';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ReviewsMarquee } from '@/components/ReviewsMarquee';
import { Faq } from '@/components/Faq';
import { HoursList, PostCard, TreatmentCard } from '@/components/Cards';
import { MapEmbed, PhotoFrame } from '@/components/Photo';
import { JsonLd, dentistSchema, faqSchema } from '@/lib/jsonld';
import { links, site, stats } from '@/content/site';
import { experience, faqs, pillars, steps } from '@/content/home';
import { treatments } from '@/content/treatments';
import { posts } from '@/content/posts';
import { sedes } from '@/content/sedes';
import { photos } from '@/content/photos';

export const metadata: Metadata = {
  title: 'Smile Lab Odontología — Odontólogos en Córdoba',
  description: site.description,
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      {/* Masthead ------------------------------------------------------- */}
      <section className="container-sl section-hero">
        <div className="hero-grid">
          <div className="hero-text">
            <Kicker>Odontología en Córdoba</Kicker>
            <h1 className="t-h1-hero mt-3.5 max-w-[17ch] lg:mt-6">
              Vive la magia de una sonrisa <Em>perfecta</Em>.
            </h1>
            <p className="t-lead mt-3.5 max-w-[32ch] font-display lg:mt-6">{site.tagline}</p>
            <p className="t-body-hero mt-3.5 max-w-[50ch] lg:mt-[22px]">{site.description}</p>
            <div className="cta-group mt-6 lg:mt-9">
              <Button href={links.agenda} external >
                Sacar turno
              </Button>
              <Button href="/tratamientos" variant="secondary">
                Ver tratamientos
              </Button>
            </div>
          </div>

          <div className="hero-photo">
            <HeroCarousel />
          </div>

          <div className="hero-stats grid grid-cols-3 gap-3 border-t border-line-strong pt-5 lg:flex lg:gap-8 lg:pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="t-stat font-display">{stat.value}</div>
                <div className="mt-1 text-xs text-muted2 lg:text-[13.5px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares + banda de WhatsApp -------------------------------------- */}
      <section className="container-sl section-tight">
        <div className="grid gap-[18px] sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.kicker} className="card card-sm p-5 lg:p-7">
              <div className="t-kicker-card">{p.kicker}</div>
              <h2 className="t-h3-post mt-3.5">{p.title}</h2>
              <p className="t-card mt-2.5 text-muted">{p.body}</p>
            </div>
          ))}
        </div>

        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="card-sm mt-[18px] flex items-center justify-between gap-3 bg-accent-soft p-5 font-display text-[16px] text-on-accent transition-colors hover:bg-accent-deep lg:gap-4 lg:px-[30px] lg:py-6 lg:text-[19px]"
        >
          <span>¿Una consulta rápida? Escribinos por WhatsApp</span>
          <span aria-hidden="true" className="text-[18px] lg:text-xl">
            →
          </span>
        </a>
      </section>

      {/* Tratamientos ----------------------------------------------------- */}
      <section className="container-sl section">
        <SectionHeader
          kicker="Tratamientos"
          title={
            <>
              Tratamientos para cuidar y mejorar tu <Em>sonrisa</Em>.
            </>
          }
          body="Tocá cada tarjeta para ver más detalle. Si tenés dudas específicas, consultanos."
          action={
            <Button href="/tratamientos" variant="secondary" size="sm" className="text-[15px]">
              Ver todos →
            </Button>
          }
        />
        <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>
      </section>

      {/* Sedes ------------------------------------------------------------ */}
      <section className="container-sl section">
        <Kicker>Elegí tu sede</Kicker>
        <h2 className="t-h2-section mt-4">Dos sedes para atenderte mejor.</h2>
        <p className="t-body mt-4 max-w-[62ch] text-muted">
          Cada sede tiene su WhatsApp directo. Elegí la que te quede más cómoda — en ambas
          trabajamos con el mismo cuidado.
        </p>
        <div className="mt-10 grid gap-[18px] md:grid-cols-2">
          {sedes.map((sede) => (
            <div key={sede.slug} className="card flex flex-col overflow-hidden">
              <PhotoFrame
                src={sede.photo.src}
                alt={sede.photo.alt}
                ratio="16/9"
                ratioLg="16/10"
                sizes="(min-width: 1180px) 581px, (min-width: 768px) 50vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-[22px] lg:p-7">
                <div className="t-kicker-card">{sede.zone}</div>
                <h3 className="t-h3-sede mt-2.5 lg:mt-3">{sede.name}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-muted lg:mt-2.5 lg:text-[15.5px]">
                  {sede.street}
                  <br />
                  {sede.barrio}
                </p>
                <a href={sede.tel} className="link-quiet t-sede-phone mt-1.5 inline-flex min-h-11 items-center lg:mt-3.5">
                  {sede.phone}
                </a>
                <HoursList hours={sede.hours} />
                <div className="map-frame mt-[22px] border border-line">
                  <MapEmbed
                    src={sede.embed}
                    title={`Mapa de ${sede.name}`}
                    className="h-[180px] lg:h-[210px]"
                  />
                </div>
                <div className="cta-group mt-[22px]">
                  <Button href={sede.maps} external variant="ghost" size="sm">
                    Cómo llegar
                  </Button>
                  <Button href={sede.wa} external size="sm" className="max-sm:order-first">
                    Consultas por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona ---------------------------------------------------- */}
      <section className="container-sl section">
        <div className="panel bg-dark px-[22px] py-[30px] lg:px-[50px] lg:py-[58px]">
          <div className="t-kicker text-accent">Cómo funciona</div>
          <h2 className="t-h2-section mt-4 text-white">
            Pedir turno es <Em tone="dark">simple</Em>.
          </h2>
          <p className="t-body mt-4 max-w-[58ch] text-dark-body">
            Todo lo coordinás por WhatsApp en pocos pasos. Te respondemos en minutos en horario de
            consultorio.
          </p>
          <ol className="mt-9 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:mt-[46px] lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.num} className="border-t border-dark-line pt-5">
                <div className="font-display text-[28px] font-light text-accent lg:text-[32px]">
                  {step.num}
                </div>
                <h3 className="t-h3-step mt-3.5 text-white">{step.title}</h3>
                <p className="t-card-dense mt-2.5 text-dark-body">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="cta-group mt-9 lg:mt-[46px]">
            <Button href={links.agenda} external variant="on-dark-accent">
              Sacar turno online
            </Button>
            <Button href={links.whatsapp} external variant="on-dark">
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Reseñas ---------------------------------------------------------- */}
      <section className="section overflow-hidden">
        <div className="container-sl">
          <Kicker>Experiencias</Kicker>
          <h2 className="t-h2-section mt-4 max-w-[26ch]">
            Lo que cuentan nuestros <Em>pacientes</Em>.
          </h2>
        </div>
        <ReviewsMarquee />
      </section>

      {/* Tu experiencia --------------------------------------------------- */}
      <section className="container-sl section">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-[60px]">
          <div>
            <Kicker>Tu experiencia</Kicker>
            <h2 className="t-h2-section-sm mt-4">Una experiencia odontológica más simple.</h2>
            <p className="t-body mt-4 text-muted">
              Sabemos que ir al dentista puede generar dudas. Por eso explicamos cada paso,
              respondemos tus consultas y buscamos que cada visita sea tranquila.
            </p>
          </div>
          <div className="grid gap-[18px] sm:grid-cols-2">
            {experience.map((e) => (
              <div key={e.title} className="card card-sm p-5 lg:p-[26px]">
                <h3 className="t-h3-step">{e.title}</h3>
                <p className="t-card-dense mt-2.5 text-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para informarte -------------------------------------------------- */}
      <section className="container-sl section">
        <SectionHeader
          size="sm"
          kicker="Para informarte"
          title="Información clara para cuidar tu sonrisa."
          body="Pequeños recursos que respondemos seguido en consultorio. Si tu duda no está acá, escribinos."
          action={
            <Button href="/para-informarte" variant="secondary" size="sm" className="text-[15px]">
              Ver todos →
            </Button>
          }
        />
        <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Equipo ----------------------------------------------------------- */}
      <section className="container-sl section">
        <div className="card panel grid items-stretch overflow-hidden lg:grid-cols-2">
          <div className="self-center p-6 lg:p-[50px]">
            <Kicker>Equipo</Kicker>
            <h2 className="t-h2-panel mt-4">Un equipo enfocado en tu experiencia.</h2>
            <p className="t-body mt-4 text-muted">
              Trabajamos para que cada consulta sea clara, profesional y acompañada. Si necesitás
              conocer qué profesional puede atender tu caso, consultanos por WhatsApp.
            </p>
            <Button href={links.whatsapp} external className="mt-7">
              Consultar por equipo
            </Button>
          </div>
          <div className="relative min-h-[320px] bg-photo lg:min-h-[440px]">
            <Image
              src={photos.equipoPanel.src}
              alt={photos.equipoPanel.alt}
              fill
              sizes="(min-width: 1024px) 590px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section className="container-sl section">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[60px]">
          <div>
            <Kicker>Preguntas frecuentes</Kicker>
            <h2 className="t-h2-panel mt-4">Lo que seguro te estás preguntando.</h2>
            <p className="t-body mt-4 text-muted">
              Si tu pregunta no está acá, escribinos por WhatsApp. Te respondemos rápido.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* CTA final -------------------------------------------------------- */}
      <section className="container-sl section">
        <div className="panel relative overflow-hidden bg-[linear-gradient(160deg,#cfe6e6_0%,#a9d3d5_100%)] px-[22px] py-9 text-center lg:px-[50px] lg:py-[70px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0_12px,transparent_12px_24px)] lg:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0_14px,transparent_14px_28px)]"
          />
          <div className="relative">
            <h2 className="t-h2-section mx-auto max-w-[24ch]">
              ¿Querés consultar por tu <Em tone="plain">sonrisa</Em>?
            </h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-cta-body lg:mt-[18px] lg:text-[17.5px]">
              Escribinos por WhatsApp y coordinamos el turno que mejor se adapte a vos.
            </p>
            <div className="cta-group mt-8 sm:justify-center">
              <Button href={links.agenda} external variant="ink">
                Sacar turno online
              </Button>
              <Button href="/sedes" variant="secondary" className="border-transparent">
                Ver sedes
              </Button>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={[...sedes.map(dentistSchema), faqSchema(faqs)]} />
    </>
  );
}
