import type { Metadata } from 'next';
import { PageHero } from '@/components/Section';
import { PostCard } from '@/components/Cards';
import { posts } from '@/content/posts';

export const metadata: Metadata = {
  title: 'Para informarte',
  description:
    'Información clara sobre endodoncia, caries y limpieza dental. Las preguntas que más nos hacen en consultorio, respondidas sin tecnicismos.',
  alternates: { canonical: '/para-informarte' },
};

export default function EducacionPage() {
  return (
    <div className="container-sl section-first">
      <PageHero
        kicker="Para informarte"
        title="Información clara para cuidar tu sonrisa."
        body="Pequeños recursos que respondemos seguido en consultorio. Si tu duda no está acá, escribinos."
      />

      <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:mt-[52px] lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
