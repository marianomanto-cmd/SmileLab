import type { Metadata } from 'next';
import './globals.css';
import { hanken, jost } from './fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileActionBar } from '@/components/MobileActionBar';
import { ToothClip } from '@/components/ToothClip';
import { Analytics } from '@/components/Analytics';
import { JsonLd, organizationSchema } from '@/lib/jsonld';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Smile Lab Odontología — Odontólogos en Córdoba',
    template: '%s | Smile Lab Odontología — Córdoba',
  },
  description: site.description,
  applicationName: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: site.legalName,
    url: site.url,
    title: 'Smile Lab Odontología — Odontólogos en Córdoba',
    description: site.description,
    images: [{ url: '/assets/brand/og-image.jpg', width: 1200, height: 630, alt: site.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smile Lab Odontología — Odontólogos en Córdoba',
    description: site.description,
    images: ['/assets/brand/og-image.jpg'],
  },
  icons: { icon: '/assets/brand/logo-mark.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${jost.variable} ${hanken.variable}`}>
      <body>
        {/* §2 — el masthead sangra con margin-right:-88px; el wrapper corta el overflow. */}
        {/* pb en mobile para que la barra fija de acciones no tape el final del footer. */}
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-bg pb-[84px] lg:pb-0">
          <ToothClip />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileActionBar />
        </div>
        <JsonLd data={organizationSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
