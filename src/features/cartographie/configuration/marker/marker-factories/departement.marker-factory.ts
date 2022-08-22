import { MarkerFactory, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { DepartementPresentation } from '../../../../core';

export type DepartementMarkerProperties = MarkerProperties<
  DepartementPresentation & {
    count: number;
    index: number;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const DEPARTEMENT_FIRST_RESULT_MARKER_WIDTH: number = 79;
const DEPARTEMENT_FIRST_RESULT_MARKER_HEIGHT: number = 89;
const DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  DEPARTEMENT_FIRST_RESULT_MARKER_WIDTH,
  DEPARTEMENT_FIRST_RESULT_MARKER_HEIGHT,
  ROUND_FALSE
);

const DEPARTEMENT_FIRST_RESULT_ICON_ANCHOR: LeafletPoint = new LeafletPoint(
  DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS.x * HALF,
  DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS.y * HALF
);

const departementFirstResultIconMarkerSvg = (count: number): string => `
<div class="position-absolute top-50 start-50 translate-middle">
  <b class="text-primary">${count}</b>
</div>
<svg class="marker departement-marker" width="76" height="89" viewBox="0 0 63 74" xmlns="http://www.w3.org/2000/svg">
  <path d="M55.755 50.243V24.39L33.091 11.459 10.424 24.39v25.852l22.664 12.932 22.665-12.932m.002-33.412V6.09L46.342.72 36.93 6.09v10.74l9.413 5.37 9.412-5.37ZM29.252 68.11V57.37L19.839 52l-9.413 5.37v10.74l9.413 5.37 9.413-5.37ZM13.224 38.162V31.15l-6.148-3.508-6.15 3.508v7.012l6.147 3.508 6.148-3.508m48.854 22.763v-5.594l-4.904-2.797-4.904 2.797v5.594l4.904 2.797 4.904-2.797Zm-39.384-46.67v-5.59l-4.904-2.798-4.903 2.797v5.594l4.903 2.797 4.904-2.797"/>
  <path fill="#fff" d="M48.81 46.281V28.353l-15.72-8.968-15.718 8.968V46.28l15.718 8.97 15.719-8.968Z"/>
</svg>`;

const DEPARTEMENT_FIRST_RESULT_DIV_ICON = (count: number): DivIcon =>
  new DivIcon({
    className: '',
    html: departementFirstResultIconMarkerSvg(count),
    iconAnchor: DEPARTEMENT_FIRST_RESULT_ICON_ANCHOR,
    iconSize: DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS,
    popupAnchor: [0, -DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS.y]
  });

const DEPARTEMENT_MARKER_WIDTH: number = 62;
const DEPARTEMENT_MARKER_HEIGHT: number = 64;
const DEPARTEMENT_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  DEPARTEMENT_MARKER_WIDTH,
  DEPARTEMENT_MARKER_HEIGHT,
  ROUND_FALSE
);

const DEPARTEMENT_ICON_ANCHOR: LeafletPoint = new LeafletPoint(
  DEPARTEMENT_MARKER_DIMENSIONS.x * HALF,
  DEPARTEMENT_MARKER_DIMENSIONS.y * HALF
);

const departementIconMarkerSvg = (count: number): string => `
<div class="position-absolute top-50 start-50 translate-middle">
  <b class="text-primary">${count}</b>
</div>
<svg class="marker departement-marker" width="60" height="60" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
  <path d="M40.036 34.093V14.904L23.518 5.307 7 14.905v19.188l16.517 9.6 16.518-9.6"/>
  <path fill="#fff" d="M34.974 31.153V17.845L23.518 11.19l-11.455 6.656v13.308l11.455 6.656 11.456-6.656Z"/>
</svg>`;

const DEPARTEMENT_DIV_ICON = (count: number): DivIcon =>
  new DivIcon({
    className: '',
    html: departementIconMarkerSvg(count),
    iconAnchor: DEPARTEMENT_ICON_ANCHOR,
    iconSize: DEPARTEMENT_MARKER_DIMENSIONS,
    popupAnchor: [0, -DEPARTEMENT_MARKER_DIMENSIONS.y]
  });

export const departementMarkerFactory: MarkerFactory<DepartementMarkerProperties, DivIcon> = (
  properties: MarkerProperties<DepartementMarkerProperties>
): DivIcon =>
  properties.index === 0 ? DEPARTEMENT_FIRST_RESULT_DIV_ICON(properties.count) : DEPARTEMENT_DIV_ICON(properties.count);
