import {
  ConditionAccess,
  Localisation,
  ModalitesAccompagnement,
  NO_LOCALISATION,
  PublicAccueilli,
  Service
} from '../../models';

export type FilterPresentation = {
  services?: Service;
  distance?: number;
  accessibilite?: boolean;
  conditions_access?: ConditionAccess[];
  publics_accueillis?: PublicAccueilli[];
  modalites_accompagnement?: ModalitesAccompagnement[];
  date_ouverture?: string;
  ouvert_actuellement?: string;
};

export type FilterQueryParamsPresentation = {
  services?: Service;
  address?: string;
  latitude?: `${number}`;
  longitude?: `${number}`;
  distance?: '5000' | '20000';
  accessibilite?: 'true' | 'false';
  conditions_access?: ConditionAccess[];
  publics_accueillis?: PublicAccueilli[];
  modalites_accompagnement?: ModalitesAccompagnement[];
  date_ouverture?: string;
  ouvert_actuellement?: string;
};

export type FilterFormPresentation = FilterPresentation & {
  address?: string;
  latitude?: number;
  longitude?: number;
};

export const toFilterFormPresentationFromQuery = (queryParams?: FilterQueryParamsPresentation): FilterFormPresentation => ({
  services: queryParams?.services,
  address: queryParams?.address,
  latitude: queryParams?.latitude ? parseFloat(queryParams.latitude) : undefined,
  longitude: queryParams?.longitude ? parseFloat(queryParams.longitude) : undefined,
  distance: queryParams?.distance ? parseInt(queryParams.distance) : undefined,
  accessibilite: queryParams?.accessibilite === 'true' ? true : undefined,
  conditions_access: queryParams?.conditions_access,
  publics_accueillis: queryParams?.publics_accueillis,
  modalites_accompagnement: queryParams?.modalites_accompagnement,
  date_ouverture: queryParams?.date_ouverture,
  ouvert_actuellement: queryParams?.ouvert_actuellement
});

export const toLocalisationFromFilterFormPresentation = (filter: FilterFormPresentation): Localisation =>
  filter.latitude && filter.longitude
    ? Localisation({ latitude: filter.latitude, longitude: filter.longitude })
    : NO_LOCALISATION;
