import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { DepartementPresentation } from '../../../../core';

export type DepartementMarkerProperties = MarkerProperties<
  DepartementPresentation & {
    count: number;
    highlight: MarkerHighlight;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

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
<div class="marker-group">
  <div class="marker-group-bg rounded-circle shadow-sm"></div>
  <div class="marker-group-bg rounded-circle bg-white "></div>
  <div class="marker-group-fg rounded-circle d-flex bg-primary">
    <span class="m-auto text-white fw-bold fs-6">${count}</span>
  </div>
</div>`;

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
): DivIcon => DEPARTEMENT_DIV_ICON(properties.count, properties.highlight);
