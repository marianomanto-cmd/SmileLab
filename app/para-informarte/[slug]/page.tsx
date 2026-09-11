import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/Button';
import { PhotoFrame } from '@/components/Photo';
import { JsonLd, articleSchema } from '@/lib/jsonld';
import { getPost, otherPosts, posts } from '@/content/posts';
import { links } from '@/content/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.desc,
    alternates: { canonical: `/para-informarte/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.desc,
      images: [{ url: post.img }],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = otherPosts(slug);

  return (
    <div className="container-sl pt-7 lg:pt-11">
      <Link
        href="/para-informarte"
        className="link-quiet inline-flex min-h-11 items-center font-display text-xs uppercase tracking-[0.16em]"
      >
        ← Para informarte
      </Link>

      <div className="mt-4 grid items-start gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <article className="max-w-[68ch]">
          <div className="flex items-center gap-[9px] font-display text-[11px] uppercase tracking-[0.18em] text-accent-ink">
            <span>{post.tag}</span>
            <span aria-hidden="true" className="text-slash">
              /
            </span>
            <span className="text-muted2">{post.read}</span>
          </div>

          <h1 className="t-h1-post mt-4 lg:mt-[18px]">{post.title}</h1>
          <p className="t-post-lead mt-5 text-body">{post.desc}</p>

          <PhotoFrame
            src={post.img}
            alt={post.imgAlt}
            ratio="16/9"
            sizes="(min-width: 1180px) 640px, (min-width: 1024px) 55vw, 100vw"
            className="mt-8 rounded-card lg:mt-9"
            priority
          />

          <div className="mt-8 flex flex-col gap-7 lg:mt-9">
            {post.body.map((block) => (
              <section key={block.h}>
                <h2 className="t-h2-article">{block.h}</h2>
                <p className="t-body-article mt-3 text-body">{block.p}</p>
              </section>
            ))}
          </div>
        </article>

        <aside className="card rounded-aside p-6 lg:sticky lg:top-[100px] lg:p-[30px]">
          <h2 className="t-h3-post">¿Te quedó una duda?</h2>
          <p className="t-card mt-2.5 text-muted">
            Escribinos y te orientamos antes de sacar el turno.
          </p>
          <Button href={links.whatsapp} external block className="mt-[22px]">
            Consultar por WhatsApp
          </Button>

          <div className="mt-7 border-t border-line-soft pt-6">
            <div className="t-label font-display">Seguir leyendo</div>
            <div className="mt-3.5 flex flex-col">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/para-informarte/${p.slug}`}
                  className="inline-flex min-h-11 items-center py-1 font-display text-[16.5px] leading-[1.4] text-ink transition-colors hover:text-accent-ink"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <JsonLd data={articleSchema(post)} />
    </div>
  );
}
