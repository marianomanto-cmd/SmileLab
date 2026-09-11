import Image from 'next/image';

/**
 * §8 — la trampa de layout.
 *
 * Todo contenedor con aspect-ratio lleva la <img> ABSOLUTA. Si queda en flujo con
 * height:100%, el porcentaje se resuelve contra una altura derivada del aspect-ratio
 * → referencia circular: la imagen cae a su altura intrínseca y estira el contenedor.
 * Con fotos verticales eso deja las cards de una misma fila con paneles de alto distinto.
 *
 * next/image con `fill` ya posiciona la imagen absoluta; `flex:0 0 auto` (en .photo)
 * evita además que el flex column de la card la crezca.
 */

type Props = {
  src: string;
  alt: string;
  /** '16/10' · '16/9' · '4/3' · '1/0.98' … */
  ratio: string;
  sizes: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  className?: string;
};

export function PhotoFrame({ src, alt, ratio, sizes, priority, loading, className = '' }: Props) {
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={loading}
        className="object-cover"
      />
    </div>
  );
}

/** Mapa de Google sin API key (HANDOFF §7.6). */
export function MapEmbed({
  src,
  title,
  className = '',
  style,
}: {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full ${className}`}
      style={style}
    />
  );
}
