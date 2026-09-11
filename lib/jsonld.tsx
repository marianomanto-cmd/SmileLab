import { links, site } from '@/content/site';
import { sedes, type Sede } from '@/content/sedes';
import type { Post } from '@/content/posts';
import type { Treatment } from '@/content/treatments';

/** Lun a Vie 9—19, Sáb 9—13, Dom cerrado (HANDOFF §9). */
const openingHours = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '09:00',
    closes: '13:00',
  },
];

const telFromHref = (tel: string) => tel.replace('tel:', '');

export function dentistSchema(sede: Sede) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${site.url}/sedes#${sede.slug}`,
    name: sede.name,
    parentOrganization: { '@type': 'Organization', name: site.legalName },
    url: `${site.url}/sedes`,
    telephone: telFromHref(sede.tel),
    image: `${site.url}${sede.photo.src}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: sede.street,
      addressLocality: 'Córdoba',
      addressRegion: 'Córdoba',
      addressCountry: 'AR',
    },
    ...(sede.geo && {
      geo: { '@type': 'GeoCoordinates', latitude: sede.geo.lat, longitude: sede.geo.lng },
    }),
    openingHoursSpecification: openingHours,
    hasMap: sede.maps,
    sameAs: [links.instagram],
    priceRange: '$$',
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}#organization`,
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/assets/brand/logo-mark.svg`,
    foundingDate: site.foundingDate,
    sameAs: [links.instagram],
    department: sedes.map((s) => ({ '@type': 'Dentist', name: s.name })),
  };
}

export function serviceSchema(treatment: Treatment) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}/tratamientos/${treatment.slug}#service`,
    serviceType: treatment.name,
    name: treatment.name,
    description: treatment.detail,
    url: `${site.url}/tratamientos/${treatment.slug}`,
    provider: { '@id': `${site.url}#organization` },
    areaServed: { '@type': 'City', name: 'Córdoba' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: links.agenda,
      availableLanguage: { '@type': 'Language', name: 'Spanish' },
    },
  };
}

export function articleSchema(post: Post) {
  const url = `${site.url}/para-informarte/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.desc,
    image: post.img.startsWith('http') ? post.img : `${site.url}${post.img}`,
    mainEntityOfPage: url,
    inLanguage: site.locale,
    author: { '@id': `${site.url}#organization` },
    publisher: { '@id': `${site.url}#organization` },
    articleSection: post.tag,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Serializa evitando que un `</script>` en el contenido corte el bloque. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
