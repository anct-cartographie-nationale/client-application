import { InjectionToken } from '@angular/core';
import { DivIcon, Icon } from 'leaflet';
import { MarkersConfiguration } from './markers.configuration';
import { lieuMediationNumeriqueMarkerFactory } from './marker-factories/lieu-mediation-numerique.marker-factory';
import { departementMarkerFactory } from './marker-factories/departement.marker-factory';

export const MARKERS_TOKEN: InjectionToken<MarkersConfiguration<never, DivIcon | Icon>> = new InjectionToken<
  MarkersConfiguration<never, DivIcon | Icon>
>('markers.configuration');

export enum MarkerKey {
  LieuMediationNumerique = 'lieuMediationNumerique',
  Departement = 'departement'
}

export const MARKERS: MarkersConfiguration<never, DivIcon | Icon> = {
  [MarkerKey.LieuMediationNumerique]: lieuMediationNumeriqueMarkerFactory,
  [MarkerKey.Departement]: departementMarkerFactory
};
