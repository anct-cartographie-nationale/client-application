import { FormControl, FormGroup } from '@angular/forms';
import {
  ConditionAcces,
  LabelNational,
  Localisation,
  ModaliteAccompagnement,
  PublicAccueilli,
  Service
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation } from '../lieux-mediation-numerique';
import { NO_LOCALISATION } from '../../models';

export type FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation,
  date: Date
) => boolean;

type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

export type Time = `${0 | 1 | 2}${Digit}:${0 | 1 | 2 | 3 | 4 | 5}${Digit}`;

export type OpeningHours = {
  day: '' | 'now' | 'all' | 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su';
  period?: '' | 'all' | 'hours';
  start?: '' | Time;
  end?: '' | Time;
};

export type FilterPresentation = {
  service?: Service;
  address?: string;
  distance?: number;
  accessibilite?: boolean;
  prise_rdv?: boolean;
  conditions_acces?: ConditionAcces[];
  publics_accueillis?: PublicAccueilli[];
  modalites_accompagnement?: ModaliteAccompagnement[];
  labels_nationaux?: LabelNational[];
  labels_autres?: string[];
  horaires_ouverture?: OpeningHours[];
};

export type FilterQueryParamsPresentation = {
  service?: Service;
  address?: string;
  adress_type?: string;
  latitude?: `${number}`;
  longitude?: `${number}`;
  distance?: `${number}`;
  accessibilite?: 'true' | 'false';
  prise_rdv?: 'true' | 'false';
  conditions_acces?: string;
  publics_accueillis?: string;
  modalites_accompagnement?: string;
  labels_nationaux?: string;
  labels_autres?: string;
  horaires_ouverture?: string;
};

export type FilterFormPresentation = FilterPresentation & {
  address?: string;
  latitude?: number;
  longitude?: number;
  addressType?: string;
};

const wrapInArray = <T>(params: string | string[]): T[] => (Array.isArray(params) ? params : [params]) as unknown as T[];

const toArray = <T>(params?: string | string[]): T[] => (!params ? [] : wrapInArray(params));

const fieldsFrom = (filterFormPresentation: FilterFormPresentation): FilterFormPresentation[keyof FilterFormPresentation][] => [
  filterFormPresentation.service,
  filterFormPresentation.address,
  filterFormPresentation.latitude,
  filterFormPresentation.longitude,
  filterFormPresentation.distance,
  filterFormPresentation.accessibilite,
  filterFormPresentation.prise_rdv,
  filterFormPresentation.conditions_acces,
  filterFormPresentation.publics_accueillis,
  filterFormPresentation.modalites_accompagnement,
  filterFormPresentation.labels_nationaux,
  filterFormPresentation.labels_autres,
  filterFormPresentation.horaires_ouverture
];

const isFilled = (filterField: FilterFormPresentation[keyof FilterFormPresentation]): boolean =>
  Array.isArray(filterField) ? filterField.length > 0 : filterField != null;

export const hasActiveFilter = (filterFormPresentation: FilterFormPresentation): boolean =>
  fieldsFrom(filterFormPresentation).some(isFilled);

export const toFilterFormPresentationFromQuery = (queryParams?: FilterQueryParamsPresentation): FilterFormPresentation => ({
  service: queryParams?.service,
  address: queryParams?.address,
  addressType: queryParams?.adress_type,
  latitude: queryParams?.latitude ? parseFloat(queryParams.latitude) : undefined,
  longitude: queryParams?.longitude ? parseFloat(queryParams.longitude) : undefined,
  distance: queryParams?.distance ? parseInt(queryParams.distance) : undefined,
  accessibilite: queryParams?.accessibilite === 'true' ? true : undefined,
  prise_rdv: queryParams?.prise_rdv === 'true' ? true : undefined,
  conditions_acces: toArray(queryParams?.conditions_acces),
  publics_accueillis: toArray(queryParams?.publics_accueillis),
  modalites_accompagnement: toArray(queryParams?.modalites_accompagnement),
  labels_nationaux: toArray(queryParams?.labels_nationaux),
  labels_autres: toArray(queryParams?.labels_autres),
  horaires_ouverture: queryParams?.horaires_ouverture ? JSON.parse(queryParams?.horaires_ouverture) : undefined
});

export const toLocalisationFromFilterFormPresentation = (filter: FilterFormPresentation): Localisation =>
  filter.latitude && filter.longitude
    ? Localisation({ latitude: filter.latitude, longitude: filter.longitude })
    : NO_LOCALISATION;

export const createFormGroupFromFilterPresentation = (filterPresentation: FilterPresentation): FormGroup =>
  Object.entries(filterPresentation).reduce(
    (formGroup: FormGroup, [field, value]: [string, FilterPresentation[keyof FilterPresentation]]): FormGroup =>
      new FormGroup({
        ...formGroup.controls,
        [field]: new FormControl(value)
      }),
    new FormGroup({})
  );
