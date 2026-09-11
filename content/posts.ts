import { photos } from './photos';

export type Post = {
  slug: string;
  tag: string;
  read: string;
  title: string;
  img: string;
  imgAlt: string;
  desc: string;
  body: { h: string; p: string }[];
};

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

export const posts: Post[] = [
  {
    slug: 'cuanto-dura-una-endodoncia',
    tag: 'Tratamientos',
    read: '3 min',
    title: '¿Cuánto dura una endodoncia?',
    img: px(5355924),
    imgAlt: 'Odontóloga trabajando sobre una pieza dental con instrumental de endodoncia.',
    desc: 'Depende del diente y la complejidad del caso. Te contamos qué esperar y cómo prepararte.',
    body: [
      {
        h: 'De qué depende el tiempo',
        p: 'Una endodoncia en un incisivo, con un solo conducto, suele resolverse más rápido que un molar con tres o cuatro. La anatomía de la pieza es el factor que más pesa.',
      },
      {
        h: 'Una o dos sesiones',
        p: 'Muchos casos se completan en una sesión de 60 a 90 minutos. Cuando hay infección activa conviene medicar el conducto y cerrarlo en una segunda visita.',
      },
      {
        h: 'Cómo prepararte',
        p: 'Vení habiendo comido y avisanos si estás tomando antibióticos o analgésicos. Si tenés dolor agudo, marcalo en el mensaje para que busquemos el turno más cercano.',
      },
    ],
  },
  {
    slug: 'como-saber-si-tengo-caries',
    tag: 'Prevención',
    read: '4 min',
    title: '¿Cómo saber si tengo una caries?',
    img: px(6627838),
    imgAlt: 'Control odontológico de rutina en el consultorio.',
    desc: 'Signos a observar, cuándo conviene venir a control y por qué no siempre duelen.',
    body: [
      {
        h: 'No siempre duelen',
        p: 'Una caries incipiente puede no dar síntomas. El dolor suele aparecer cuando la lesión ya avanzó hacia capas más profundas, así que esperar a que moleste no es una buena referencia.',
      },
      {
        h: 'Qué observar',
        p: 'Manchas blancas u oscuras, sensibilidad al frío o al dulce, comida que se traba siempre en el mismo lugar, o un filo que cambió de forma.',
      },
      {
        h: 'Cuándo venir',
        p: 'Un control cada seis meses permite detectar lesiones chicas, que se resuelven en una sola sesión y con menos desgaste de la pieza.',
      },
    ],
  },
  {
    slug: 'cada-cuanto-hacer-una-limpieza',
    tag: 'Prevención',
    read: '2 min',
    title: '¿Cada cuánto hacer una limpieza?',
    img: photos.instrumental.src,
    imgAlt: photos.instrumental.alt,
    desc: 'La frecuencia ideal depende de cada caso. Una guía clara para mantener el control.',
    body: [
      {
        h: 'La referencia general',
        p: 'Para la mayoría de los pacientes, una limpieza cada seis meses mantiene encías sanas y permite revisar el estado general de la boca.',
      },
      {
        h: 'Cuándo conviene más seguido',
        p: 'Si tenés tendencia a formar sarro, encías que sangran, ortodoncia o fumás, el intervalo puede acortarse a tres o cuatro meses.',
      },
      {
        h: 'Lo que hacés en casa',
        p: 'La limpieza en consultorio complementa el cepillado y el hilo dental, no los reemplaza. La técnica diaria es la que define el resultado a largo plazo.',
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const otherPosts = (slug: string) => posts.filter((p) => p.slug !== slug);
