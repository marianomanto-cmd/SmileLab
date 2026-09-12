/**
 * Reseñas de pacientes — REALES, de Google.
 *
 * Transcriptas textualmente del perfil de Google Business de Smile Lab.
 * No se editan, no se corrigen y no se recortan: se muestran tal como las
 * escribió cada persona, emojis incluidos.
 *
 * Campos que SÍ son datos reales: nombre del autor, puntaje, texto y el tiempo
 * relativo que muestra Google.
 *
 * Campos que el diseño preveía y NO están: la sede, el tratamiento y el
 * profesional que atendió. Google no los provee y deducirlos sería inventar
 * metadatos sobre reseñas reales, así que el pie de la tarjeta muestra la
 * atribución a Google en su lugar (que además es lo que piden sus términos).
 *
 * Las fotos de perfil de los autores viven en googleusercontent.com y solo se
 * pueden obtener por la API de Places. NO reemplazarlas por fotos de stock:
 * ponerle la cara de un modelo al nombre de una persona real la tergiversa, y
 * las licencias de stock prohíben implicar que el modelo fue paciente.
 *
 * Quedan fuera a propósito las reseñas que Google mostraba truncadas con «… Más»
 * (Wendi Romina Oroná, valentina cortese): publicarlas cortadas a mitad de frase
 * se lee como un error, y completarlas a ojo sería inventar.
 */

export type Review = {
  name: string;
  /** Tiempo relativo, tal cual lo muestra Google. */
  when: string;
  rating: number;
  text: string;
};

export const REVIEWS_ARE_REAL = true;

/**
 * NO se emite JSON-LD de Review ni AggregateRating, y ahora por un motivo
 * distinto al anterior: Google prohíbe marcar como structured data propia las
 * reseñas tomadas de sitios de terceros — incluido el propio Google. Hacerlo
 * es «self-serving review markup» y puede costar una penalización manual.
 */
export const EMIT_REVIEW_SCHEMA = false;

export const reviews: Review[] = [
  {
    name: 'Paula Lucía Rodriguez',
    when: 'Hace un mes',
    rating: 5,
    text: 'Excelente profesional Paula García. Me explica absolutamente todo lo que vamos haciendo, con amabilidad y calidez. Muy recomendable',
  },
  {
    name: 'Agustina Cordoba',
    when: 'Hace 3 meses',
    rating: 5,
    text: 'Las chicas super amorosas ❤️ 🦷 el mejor lugar que cuida tu sonrisa 🤗',
  },
  {
    name: 'Ariana Diaz',
    when: 'Hace 3 meses',
    rating: 5,
    text: 'Excelente atención y muy buen ámbito',
  },
  {
    name: 'Josue Bacca',
    when: 'Hace 4 meses',
    rating: 5,
    text: 'Muy buena atención, tanto en el consultorio como por parte de la secretaría y el contacto por whatsapp. Fueron muy amables y colaboradores con todo lo relacionado a reintegros que tuve que hacer. El lugar también muy lindo y limpio. Tampoco he tenido que esperar mucho a ser atendido.',
  },
  {
    name: 'Karen Sader',
    when: 'Hace 4 meses',
    rating: 5,
    text: 'La verdad llegué al lugar por necesidad de atenderme por obra social y me encontré con el Doctor Gastón y me encantó, un excelente profesional, me dejó toda la boca arreglada y muy prolijo… las recepcionistas tmb un amor sobre todo Bianca ! Me seguiré atendiendo ahí !',
  },
  {
    name: 'carlos benitez',
    when: 'Hace 4 meses',
    rating: 5,
    text: 'Excelente atencion, muy calidad. Equipo de trabajo muy profesional',
  },
  {
    name: 'Flavia Pergolesi',
    when: 'Hace 6 meses',
    rating: 5,
    text: 'Excelente atención y puntualidad. Además los turnos son muy próximos. Por lo menos para odontopediatría. Recomiendo!!',
  },
  {
    name: 'Tamara Fino',
    when: 'Hace 7 meses',
    rating: 5,
    text: 'La atención es excelente, son muy amables, te explican bien los procedimientos que van a realizar en cada momento.',
  },
  {
    name: 'Luciano Vera',
    when: 'Hace 8 meses',
    rating: 5,
    text: 'Más que buena la atención, excelente!!!!! Antes habia pasado por varios centros odontologicos y todos son iguales de vuelteros y un desastre pero aca todo lo contrario. Virginia la mejor y muy profesional!!',
  },
  {
    name: 'Eliana Sanchez',
    when: 'Hace 11 meses',
    rating: 5,
    text: 'Excelente la atención y en especial a la doctora que mi hija de 5 años! Esta muy feliz! Y ama ir a ver a su doctora de los dientes!gracias por la buena onda, su paciencia, cariño, y dulzura Muchas gracias Doc!',
  },
  {
    name: 'Sofia Freytes',
    when: 'Hace 3 años',
    rating: 5,
    text: 'El consultorio es muy lindo, se nota desde que entras que cada detalle esta pensado y cuidado para hacer que la experiencia de ir al odontólogo sea distinta! Las chicas que atienden un 11, me hice 2 limpiezas y un arreglo, y no sentí nada! Jose es excelente profesional!',
  },
  {
    name: 'Sebastian Bustos',
    when: 'Hace un mes',
    rating: 5,
    text: 'Buena atención muy amable',
  },
  {
    name: 'Anabel Diez',
    when: 'Hace 6 meses',
    rating: 5,
    text: 'Excelente atención, profesional y humanamente',
  },
  {
    name: 'Cami Salvay',
    when: 'Hace 7 meses',
    rating: 5,
    text: 'Muy buena la atencion! Recomiendo',
  },
  {
    name: 'ludmila meneghello',
    when: 'Hace 10 meses',
    rating: 5,
    text: 'Muy buena atención y muy profesionales , los trabajos q hicieron en mis dientes para mantenerlos saludables y esteticamnete lindos , fue IMPECABLE !!!! . Gracias',
  },
  {
    name: 'MARINA VARGAS',
    when: 'Hace 10 meses',
    rating: 5,
    text: 'Muy buena atención!!! Una dulce total la doctora. Estoy muy feliz!!! Se las recomiendo.',
  },
  {
    name: 'Maximiliano Escudero',
    when: 'Hace 10 meses',
    rating: 5,
    text: 'Exelente Lugar! La Profesional Paula García una Genia..',
  },
  {
    name: 'Andrea Patoco',
    when: 'Hace 11 meses',
    rating: 5,
    text: 'Excelente atención profesional, trato muy respetuoso y humano. Súper recomendable!',
  },
  {
    name: 'Joaquin Wevar',
    when: 'Hace un año',
    rating: 5,
    text: 'Excelente trato y resultados. El Od. Gastón Bevolo me recuperó una muela partida bastante complicada y la pudo salvar con una incrustación. Muy profesional, claro en las explicaciones y cuidadoso durante el tratamiento. Todo el equipo fue muy amable y el ambiente de la clínica excelente. 100% recomendable!!',
  },
  {
    name: 'Santana Francisco',
    when: 'Hace un año',
    rating: 5,
    text: 'La atención es excelente, siempre a tiempo y atentos para solucionar cualquier duda o inconveniente. La Dra Josefina es espectacular y sumamente profesional.',
  },
  {
    name: 'Natalia Molina',
    when: 'Hace un año',
    rating: 5,
    text: 'El Mejor lugar con los mejores profesionales, con mucha calidad humana, excelente atención y con todos los equipos necesarios para atender bien a los pacientes...gracias',
  },
  {
    name: 'Camila Arias',
    when: 'Hace un año',
    rating: 5,
    text: 'Todo excelente. El consul hermoso y limpio, buena comunicación para reservar los turnos y la doc sol una divina y súper recomendable. Lo mejor es que atienden por obra social y la atención es un 100. Gracias chicas 🫶',
  },
  {
    name: 'Jime Tschieder',
    when: 'Hace un año',
    rating: 5,
    text: 'Estoy feliz de haber encontrado un lugar para atenderme, la dra SOL es una excelente profesional y persona, desde la primera vez q me atendio me dio mucha confianza.. super recomendable! Gracias dra Sol x tu trabajo y tu compromiso!',
  },
  {
    name: 'Facu Ruiz',
    when: 'Hace un año',
    rating: 5,
    text: 'recomendadísimo! excelente atención y profesionales sobresalientes, especialmente la Dra. Osuna',
  },
  {
    name: 'Jere Muriette',
    when: 'Hace un año',
    rating: 5,
    text: 'Excelente lugar, ubicación y una genia la doc Sol! Le dio mucha tranquilidad y una excelente atención a mi hija de 3 años en sus primeras consultas y también al resto de los integrantes de la familia! 10/10 ❤️',
  },
  {
    name: 'Rebeca Marcano',
    when: 'Hace un año',
    rating: 5,
    text: 'Le doy 5 estrellas! Primera vez que me atiendo acá y salí muy feliz y le pude perder el miedo al dentista. Muy pacientes, atentos, el consultorio súper lindo y la música durante la consulta es un plus jajaja mil gracias por la atención! Lo recomiendo',
  },
  {
    name: 'florencia garrido',
    when: 'Hace 3 años',
    rating: 5,
    text: 'Una atención excelente. Relación directa entre calidad y precio. La amabilidad , profesionalidad que tienen es súper. Muy conforme! Sol es una genia. Fui con mi hijo y perdió el miedo después de haber tenido otras experiencias no muy gratas en otros lugares.',
  },
  {
    name: 'Belén Ampuero',
    when: 'Hace 3 años',
    rating: 5,
    text: 'Excelente atención y servicio. Lugar muy limpio y sin tiempo de espera. Los turnos son rápidos, de una semana para la otra. Muy conforme',
  },
  {
    name: 'Mariano Zamorano',
    when: 'Hace 4 años',
    rating: 5,
    text: 'Excelente atención desde el primer día! Muy buena organización con los turnos, el espacio que tienen es agradable y moderno. En lo particular Sol es una genia, muy recomendable para grandes y niños. Sigan así chicas!',
  },
  {
    name: 'Guido Possetto',
    when: 'Hace un mes',
    rating: 5,
    text: 'Exclente la atención y los consultorios. Se destaca la amabilidad y la atención con la que las doc explican y atienden, en especial la doc Anita!',
  },
  {
    name: 'Alejandro Ferrero',
    when: 'Hace un mes',
    rating: 5,
    text: 'Desde el primer dia que me atendí fue excelente. Recomiendo 100%',
  },
  {
    name: 'Maria Jazmin Devalis',
    when: 'Hace 3 meses',
    rating: 5,
    text: 'Estoy muy contenta con la atención recibida. Siempre me trataron con mucha paciencia, amabilidad y profesionalismo. Me sentí acompañada en todo momento y los resultados fueron excelentes. Se nota el compromiso y la dedicación con cada paciente. Lo recomiendo totalmente!!! La odontóloga Sol es una genia🌷💚🌷💗',
  },
  {
    name: 'Emilia Tartaglini',
    when: 'Hace 4 meses',
    rating: 5,
    text: 'Muy buena atención! Hermoso lugar',
  },
  {
    name: 'Natalia Ramos',
    when: 'Hace 5 meses',
    rating: 5,
    text: 'Sol es excelente!!! Amable, expeditiva y super profesional!!',
  },
  {
    name: 'Paula Acosta',
    when: 'Hace 7 meses',
    rating: 5,
    text: 'Muy lindo consultorio, los odontólogos son super buenos, te explican todo y tienen muy buen criterio!',
  },
  {
    name: 'Laura Sanchez',
    when: 'Hace un año',
    rating: 5,
    text: 'Excelentes profesionales siempre, súper amables!!! Mi lugar de confianza hace muchos años, recomendable al 100%! Jose una genia!!!',
  },
];

/** Meses aproximados, solo para ordenar de más reciente a más vieja. */
const monthsAgo = (when: string) => {
  const n = /un mes/.test(when) ? 1 : /un año/.test(when) ? 12 : Number(when.match(/\d+/)?.[0] ?? 0);
  return /año/.test(when) ? n * 12 : n;
};

export const reviewsByRecency = [...reviews].sort((a, b) => monthsAgo(a.when) - monthsAgo(b.when));
