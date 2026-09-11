/**
 * Profesionales de Smile Lab.
 * Fuente: listado de profesionales del sistema de gestión (Dentalink).
 *
 * OJO: revisar antes de publicar. En el listado original conviven profesionales
 * reales con registros de demo del propio Dentalink — los de matrícula
 * «MP 12.345 / 23.456 / 34.567» son correlativos y tienen pinta de seed data.
 * Acá quedan solo los que tienen matrícula verosímil.
 */

export type Professional = {
  name: string;
  license: string;
  specialty: string;
};

export const team: Professional[] = [
  { name: 'Ana Solange Bilinski', license: 'MP 11195', specialty: 'Odontología general' },
  { name: 'Nicolle Giraud', license: 'MP 11258', specialty: 'Endodoncia y odontología general' },
  { name: 'Ana Belén Bertello', license: 'MP 12133', specialty: 'Odontología general' },
  { name: 'Agustina Sánchez', license: 'MP 12603', specialty: 'Odontología general' },
];

/** Registros del listado que parecen datos de demo de Dentalink. Confirmar con la clínica. */
export const teamPendingReview: Professional[] = [
  { name: 'María Álvarez', license: 'MP 12.345', specialty: 'Odontología general' },
  { name: 'Tomás Benítez', license: 'MP 23.456', specialty: 'Endodoncia' },
  { name: 'Lucía Cabral', license: 'MP 34.567', specialty: 'Prótesis y rehabilitación' },
];
