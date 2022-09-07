import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { DepartementPresentation } from '../../../../core';

export type DepartementMarkerProperties = MarkerProperties<
  DepartementPresentation & {
    count: number;
    index: number;
    highlight: MarkerHighlight;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const DEPARTEMENT_FIRST_RESULT_MARKER_WIDTH: number = 75;
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
<svg class="marker departement-marker" xmlns="http://www.w3.org/2000/svg" width="76" height="89" viewBox="0 0 76 89" >
	<path d="M67.6,20.4v-13L56.3,0.9L45.1,7.4v13 l11.3,6.5L67.6,20.4"/>
	<path d="M35.9,82.4v-13l-11.3-6.5l-11.3,6.5v13 l11.3,6.5L35.9,82.4"/>
	<path d="M16.8,46.2v-8.5l-7.3-4.2l-7.3,4.2v8.5 l7.3,4.2L16.8,46.2"/>
	<path d="M72.6,73.7v-6.8l-5.9-3.4l-5.9,3.4v6.8 l5.9,3.4L72.6,73.7"/>
	<path d="M28.1,17.2v-6.8l-5.9-3.4l-5.9,3.4v6.8 l5.9,3.4L28.1,17.2"/>
	<path  fill="#fff" style="filter: drop-shadow(1px 3px 3px rgb(0,0,0,0.4));" class="marker-hover-active" d="M67.2,61.4V27.6L38,10.8L8.8,27.6v33.7 L38,78.2L67.2,61.4"/>
	<path d="M65.1,60.1V28.9L38,13.2L10.9,28.9v31.3 L38,75.8L65.1,60.1"/>
	<path  fill="#fff" d="M56.8,55.3V33.7L38,22.8L19.2,33.7v21.7 L38,66.2L56.8,55.3"/>
</svg>`;

const DEPARTEMENT_FIRST_RESULT_DIV_ICON = (count: number, highlight: MarkerHighlight): DivIcon =>
  new DivIcon({
    className: departementMarkerHighlightClass(highlight),
    html: departementFirstResultIconMarkerSvg(count),
    iconAnchor: DEPARTEMENT_FIRST_RESULT_ICON_ANCHOR,
    iconSize: DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS,
    popupAnchor: [0, -DEPARTEMENT_FIRST_RESULT_MARKER_DIMENSIONS.y]
  });

const DEPARTEMENT_MARKER_WIDTH: number = 59;
const DEPARTEMENT_MARKER_HEIGHT: number = 60;
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
<svg class="marker departement-marker" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
	<path  fill="#fff" style="filter: drop-shadow(1px 3px 3px rgb(0,0,0,0.4));" class="marker-hover-active" d="M51.9,42.6V17.4L30,4.7L8.1,17.4v25.3 L30,55.3L51.9,42.6"/>
	<path d="M49.9,41.5v-23L30,7L10.1,18.5v23L30,53 L49.9,41.5"/>
	<path  fill="#fff" d="M43.8,38V22l-13.8-8l-13.8,8V38l13.8,8 L43.8,38"/>
</svg>`;

const DEPARTEMENT_DIV_ICON = (count: number, highlight: MarkerHighlight): DivIcon =>
  new DivIcon({
    className: departementMarkerHighlightClass(highlight),
    html: departementIconMarkerSvg(count),
    iconAnchor: DEPARTEMENT_ICON_ANCHOR,
    iconSize: DEPARTEMENT_MARKER_DIMENSIONS,
    popupAnchor: [0, -DEPARTEMENT_MARKER_DIMENSIONS.y]
  });

const DEPARTEMENT_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: '',
  hover: 'marker-hover'
};

const departementMarkerHighlightClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : DEPARTEMENT_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

export const departementMarkerFactory: MarkerFactory<DepartementMarkerProperties, DivIcon> = (
  properties: MarkerProperties<DepartementMarkerProperties>
): DivIcon =>
  properties.index === 0
    ? DEPARTEMENT_FIRST_RESULT_DIV_ICON(properties.count, properties.highlight)
    : DEPARTEMENT_DIV_ICON(properties.count, properties.highlight);
