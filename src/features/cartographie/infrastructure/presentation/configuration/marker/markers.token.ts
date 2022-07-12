import { InjectionToken } from '@angular/core';
import { MarkersConfiguration } from './markers.configuration';
import { DivIcon, Icon } from 'leaflet';
import { lieuMediationNumeriqueMerkerFactory } from './marker-factories/lieu-mediation-numerique.marker-factory';

export const MARKERS_TOKEN: InjectionToken<MarkersConfiguration<never, DivIcon | Icon>> = new InjectionToken<
  MarkersConfiguration<never, DivIcon | Icon>
>('markers.configuration');

export enum MarkerKey {
  LieuMediationNumerique = 'lieuMediationNumerique'
}

export const MARKERS: MarkersConfiguration<never, DivIcon | Icon> = {
  [MarkerKey.LieuMediationNumerique]: lieuMediationNumeriqueMerkerFactory
};
