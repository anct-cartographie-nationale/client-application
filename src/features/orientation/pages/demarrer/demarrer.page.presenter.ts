import { FilterFormPresentation } from '../../../core/presenters';

const fieldsFrom = (filterFormPresentation: FilterFormPresentation): FilterFormPresentation[keyof FilterFormPresentation][] => [
  filterFormPresentation.service,
  filterFormPresentation.address,
  filterFormPresentation.latitude,
  filterFormPresentation.longitude,
  filterFormPresentation.distance,
  filterFormPresentation.accessibilite,
  filterFormPresentation.conditions_acces,
  filterFormPresentation.publics_accueillis,
  filterFormPresentation.modalites_accompagnement,
  filterFormPresentation.horaires_ouverture
];

const isFilled = (filterField: FilterFormPresentation[keyof FilterFormPresentation]): boolean =>
  Array.isArray(filterField) ? filterField.length > 0 : filterField != null;

export const hasActiveFilter = (filterFormPresentation: FilterFormPresentation): boolean =>
  fieldsFrom(filterFormPresentation).some(isFilled);
