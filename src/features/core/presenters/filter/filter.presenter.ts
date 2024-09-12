import { FormControl, FormGroup } from '@angular/forms';
import {
  Frais,
  DispositifProgrammeNational,
  Localisation,
  ModaliteAccompagnement,
  PublicSpecifiquementAdresse,
  PriseEnChargeSpecifique,
  Service,
  FormationLabel
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
  services?: Service[];
  address?: string;
  distance?: number;
  fiche_acces_libre?: boolean;
  prise_rdv?: boolean;
  frais_a_charge?: Frais[];
  publics_specifiquement_adresses?: PublicSpecifiquementAdresse[];
  prise_en_charge_specifique?: PriseEnChargeSpecifique[];
  modalites_accompagnement?: ModaliteAccompagnement[];
  dispositif_programmes_nationaux?: DispositifProgrammeNational[];
  formations_labels?: FormationLabel[];
  autres_formations_labels?: string[];
  horaires_ouverture?: OpeningHours[];
};

export type FilterQueryParamsPresentation = {
  services?: Service[];
  address?: string;
  address_id?: string;
  latitude?: `${number}`;
  longitude?: `${number}`;
  distance?: `${number}`;
  fiche_acces_libre?: 'true' | 'false';
  prise_rdv?: 'true' | 'false';
  frais_a_charge?: string;
  publics_specifiquement_adresses?: string;
  prise_en_charge_specifique?: string;
  modalites_accompagnement?: string;
  dispositif_programmes_nationaux?: string;
  formations_labels?: string;
  autres_formations_labels?: string;
  horaires_ouverture?: string;
};

export type FilterFormPresentation = FilterPresentation & {
  address?: string;
  latitude?: number;
  longitude?: number;
  addressId?: string;
};

const wrapInArray = <T>(params: string | string[]): T[] => (Array.isArray(params) ? params : [params]) as unknown as T[];

const toArray = <T>(params?: string | string[]): T[] => (!params ? [] : wrapInArray(params));

const fieldsFrom = (filterFormPresentation: FilterFormPresentation): FilterFormPresentation[keyof FilterFormPresentation][] => [
  filterFormPresentation.services,
  filterFormPresentation.address,
  filterFormPresentation.latitude,
  filterFormPresentation.longitude,
  filterFormPresentation.distance,
  filterFormPresentation.fiche_acces_libre,
  filterFormPresentation.prise_rdv,
  filterFormPresentation.frais_a_charge,
  filterFormPresentation.publics_specifiquement_adresses,
  filterFormPresentation.prise_en_charge_specifique,
  filterFormPresentation.modalites_accompagnement,
  filterFormPresentation.dispositif_programmes_nationaux,
  filterFormPresentation.autres_formations_labels,
  filterFormPresentation.horaires_ouverture
];

const isFilled = (filterField: FilterFormPresentation[keyof FilterFormPresentation]): boolean =>
  Array.isArray(filterField) ? filterField.length > 0 : filterField != null;

export const hasActiveFilter = (filterFormPresentation: FilterFormPresentation): boolean =>
  fieldsFrom(filterFormPresentation).some(isFilled);

export const toFilterFormPresentationFromQuery = (queryParams?: FilterQueryParamsPresentation): FilterFormPresentation => ({
  services: toArray(queryParams?.services),
  address: queryParams?.address,
  addressId: queryParams?.address_id,
  latitude: queryParams?.latitude ? parseFloat(queryParams.latitude) : undefined,
  longitude: queryParams?.longitude ? parseFloat(queryParams.longitude) : undefined,
  distance: queryParams?.distance ? parseInt(queryParams.distance) : undefined,
  fiche_acces_libre: queryParams?.fiche_acces_libre === 'true' ? true : undefined,
  prise_rdv: queryParams?.prise_rdv === 'true' ? true : undefined,
  frais_a_charge: toArray(queryParams?.frais_a_charge),
  publics_specifiquement_adresses: toArray(queryParams?.publics_specifiquement_adresses),
  prise_en_charge_specifique: toArray(queryParams?.prise_en_charge_specifique),
  modalites_accompagnement: toArray(queryParams?.modalites_accompagnement),
  dispositif_programmes_nationaux: toArray(queryParams?.dispositif_programmes_nationaux),
  formations_labels: toArray(queryParams?.formations_labels),
  autres_formations_labels: toArray(queryParams?.autres_formations_labels),
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
