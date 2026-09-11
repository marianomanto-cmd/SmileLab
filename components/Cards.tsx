import Link from 'next/link';
import { PhotoFrame } from './Photo';
import type { Treatment } from '@/content/treatments';
import type { Post } from '@/content/posts';

/** Grilla de 3 columnas: la card mide ~381px en el contenedor de 1180px. */
const GRID_3 = '(min-width: 1180px) 381px, (min-width: 640px) 45vw, 100vw';

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link
      href={`/tratamientos/${treatment.slug}`}
      className="card card-link flex flex-col overflow-hidden"
    >
      <div className="relative">
        {/* El encuadre cambia por breakpoint: 16/9 en mobile, 16/10 en desktop (§8). */}
        <PhotoFrame
          src={treatment.img}
          alt={treatment.name}
          ratio="16/9"
          ratioLg="16/10"
          sizes={GRID_3}
        />
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center bg-white/[0.92] font-display text-[11px] text-accent-ink lg:left-3.5 lg:top-3.5 lg:h-9 lg:w-9 lg:text-xs"
          style={{ borderRadius: '50% 50% 50% 50% / 42% 42% 58% 58%' }}
        >
          {treatment.num}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-[26px]">
        <h3 className="t-h3-card">{treatment.name}</h3>
        <p className="t-card mt-2 text-muted lg:mt-2.5">{treatment.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-[13px] font-semibold text-accent-ink lg:pt-5 lg:text-[13.5px]">
          <span>Más detalle</span>
          <span className="font-display font-normal text-muted2">{treatment.meta}</span>
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/para-informarte/${post.slug}`}
      className="card card-link flex flex-col overflow-hidden"
    >
      <PhotoFrame src={post.img} alt={post.imgAlt} ratio="16/9" sizes={GRID_3} />
      <div className="flex flex-1 flex-col p-5 lg:p-[26px]">
        <div className="flex items-center gap-[9px] font-display text-[11px] uppercase tracking-[0.18em] text-accent-ink">
          <span>{post.tag}</span>
          <span aria-hidden="true" className="text-slash">
            /
          </span>
          <span className="text-muted2">{post.read}</span>
        </div>
        <h3 className="t-h3-post mt-3.5 lg:mt-4">{post.title}</h3>
        <p className="t-card mt-2 text-muted lg:mt-2.5">{post.desc}</p>
        <span className="mt-auto pt-4 text-[13px] font-semibold text-accent-ink lg:pt-5 lg:text-[13.5px]">
          Leer más →
        </span>
      </div>
    </Link>
  );
}

/** Filas de horario de una sede. Se usa en la card del home y en /sedes. */
export function HoursList({ hours }: { hours: { day: string; time: string }[] }) {
  return (
    <ul className="mt-4 flex list-none flex-col border-t border-line-soft p-0 lg:mt-3">
      {hours.map((h) => (
        <li
          key={h.day}
          className="flex justify-between gap-3 border-b border-line-soft py-2.5 text-[13.5px] lg:gap-4 lg:py-[11px] lg:text-[14.5px]"
        >
          <span className="text-muted">{h.day}</span>
          <span className="font-display text-ink">{h.time}</span>
        </li>
      ))}
    </ul>
  );
}
