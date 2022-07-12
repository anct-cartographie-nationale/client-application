import { Service } from '../../../../../models/service';
import { ModalitesAccess } from '../../../../../models/modalites-access';
import { Public } from '../../../../../models/public';
import { TypeAccompagnement } from '../../../../../models/type-accompagnement';
import { Localisation } from '../../../../../models/localisation/localisation';

export type FilterPresentation = {
  services?: Service;
  distance?: number;
  accessibilite?: boolean;
  modalites_access?: ModalitesAccess[];
  publics?: Public[];
  types_accompagnement?: TypeAccompagnement[];
};

export type FilterQueryParamsPresentation = {
  services?: Service;
  address?: string;
  latitude?: `${number}`;
  longitude?: `${number}`;
  distance?: '5000' | '20000';
  accessibilite?: 'true' | 'false';
  modalites_access?: ModalitesAccess[];
  publics?: Public[];
  types_accompagnement?: TypeAccompagnement[];
};

export type FilterFormPresentation = FilterPresentation & {
  address?: string;
  latitude?: number;
  longitude?: number;
};

export const toFilterFormPresentationFromQuery = (queryParams: FilterQueryParamsPresentation): FilterFormPresentation => ({
  services: queryParams.services,
  address: queryParams.address,
  latitude: queryParams.latitude ? parseFloat(queryParams.latitude) : undefined,
  longitude: queryParams.longitude ? parseFloat(queryParams.longitude) : undefined,
  distance: queryParams.distance ? parseInt(queryParams.distance) : undefined,
  accessibilite: queryParams.accessibilite === 'true' ? true : undefined,
  modalites_access: queryParams.modalites_access,
  publics: queryParams.publics,
  types_accompagnement: queryParams.types_accompagnement
});

export const toLocalisationFromFilterFormPresentation = (filter: FilterFormPresentation): Localisation =>
  Localisation({ latitude: filter.latitude, longitude: filter.longitude });
