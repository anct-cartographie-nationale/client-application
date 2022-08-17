export * from './leaflet-map-state-change/leaflet-map-state-change.directive';
export * from './leaflet-marker/leaflet-map-marker.directive';

import { LeafletMapPopupDirective } from './leaflet-map-popup/leaflet-map-popup.directive';
import { LeafletMapStateChangeDirective } from './leaflet-map-state-change/leaflet-map-state-change.directive';
import { LeafletMapTooltipDirective } from './leaflet-map-tooltip/leaflet-map-tooltip.directive';
import { LeafletMapMarkerDirective } from './leaflet-marker/leaflet-map-marker.directive';

export const directives = [
  LeafletMapPopupDirective,
  LeafletMapStateChangeDirective,
  LeafletMapTooltipDirective,
  LeafletMapMarkerDirective
];
