import {
  ConditionAcces,
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

export type FilterPresentation = {
  service?: Service;
  distance?: number;
  accessibilite?: boolean;
  conditions_acces?: ConditionAcces[];
  publics_accueillis?: PublicAccueilli[];
  modalites_accompagnement?: ModaliteAccompagnement[];
  date_ouverture?: string;
  ouvert_actuellement?: string;
};

export type FilterQueryParamsPresentation = {
  service?: Service;
  address?: string;
  latitude?: `${number}`;
  longitude?: `${number}`;
  distance?: '5000' | '20000';
  accessibilite?: 'true' | 'false';
  conditions_acces?: string;
  publics_accueillis?: string;
  modalites_accompagnement?: string;
  date_ouverture?: string;
  ouvert_actuellement?: string;
};

export type FilterFormPresentation = FilterPresentation & {
  address?: string;
  latitude?: number;
  longitude?: number;
};

const wrapInArray = <T>(params: string | string[]): T[] => (Array.isArray(params) ? params : [params]) as unknown as T[];

const toArray = <T>(params?: string | string[]): T[] => (!params ? [] : wrapInArray(params));

export const toFilterFormPresentationFromQuery = (queryParams?: FilterQueryParamsPresentation): FilterFormPresentation => ({
  service: queryParams?.service,
  address: queryParams?.address,
  latitude: queryParams?.latitude ? parseFloat(queryParams.latitude) : undefined,
  longitude: queryParams?.longitude ? parseFloat(queryParams.longitude) : undefined,
  distance: queryParams?.distance ? parseInt(queryParams.distance) : undefined,
  accessibilite: queryParams?.accessibilite === 'true' ? true : undefined,
  conditions_acces: toArray(queryParams?.conditions_acces),
  publics_accueillis: toArray(queryParams?.publics_accueillis),
  modalites_accompagnement: toArray(queryParams?.modalites_accompagnement),
  date_ouverture: queryParams?.date_ouverture,
  ouvert_actuellement: queryParams?.ouvert_actuellement
});

export const toLocalisationFromFilterFormPresentation = (filter: FilterFormPresentation): Localisation =>
  filter.latitude && filter.longitude
    ? Localisation({ latitude: filter.latitude, longitude: filter.longitude })
    : NO_LOCALISATION;
