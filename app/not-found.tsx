import { Button } from '@/components/Button';
import { Kicker } from '@/components/Section';

export default function NotFound() {
  return (
    <div className="container-sl section-first pb-20">
      <Kicker>Error 404</Kicker>
      <h1 className="t-h1-page mt-4 max-w-[20ch] lg:mt-[18px]">
        No encontramos la página que buscabas.
      </h1>
      <p className="t-body-hero mt-4 max-w-[52ch] lg:mt-5">
        Puede que el enlace esté viejo. Volvé al inicio o escribinos por WhatsApp y te orientamos.
      </p>
      <div className="cta-group mt-8">
        <Button href="/">Volver al inicio</Button>
        <Button href="/tratamientos" variant="secondary">
          Ver tratamientos
        </Button>
      </div>
    </div>
  );
}
