import { DivIcon, Icon } from 'leaflet';

export type MarkerHighlight = 'focus' | 'hint';

export interface TypedMarker {
  markerType: string;
  zIndexOffset?: number;
  highlight?: MarkerHighlight;
}

export type MarkerProperties<T> = T & TypedMarker;

export type MarkerFactory<TProperty, TIcon extends DivIcon | Icon> = (properties: MarkerProperties<TProperty>) => TIcon;

export type MarkersConfiguration<TProperty, TIcon extends DivIcon | Icon> = Record<string, MarkerFactory<TProperty, TIcon>>;
