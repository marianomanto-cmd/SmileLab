import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { treatments } from '@/content/treatments';
import { posts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/tratamientos', priority: 0.9 },
    { path: '/sedes', priority: 0.9 },
    { path: '/turnos', priority: 0.8 },
    { path: '/contacto', priority: 0.8 },
    { path: '/pacientes', priority: 0.7 },
    { path: '/para-informarte', priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: r.priority,
    })),
    ...treatments.map((t) => ({
      url: `${site.url}/tratamientos/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/para-informarte/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
