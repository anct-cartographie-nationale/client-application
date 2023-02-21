import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { TerritoirePresentation } from '../../../../core';

export type TerritoireMarkerProperties = MarkerProperties<
  TerritoirePresentation & {
    count: number;
    highlight: MarkerHighlight;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const TERRITOIRE_MARKER_WIDTH: number = 48;
const TERRITOIRE_MARKER_HEIGHT: number = 49;
const TERRITOIRE_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  TERRITOIRE_MARKER_WIDTH,
  TERRITOIRE_MARKER_HEIGHT,
  ROUND_FALSE
);

const TERRITOIRE_ICON_ANCHOR: LeafletPoint = new LeafletPoint(
  TERRITOIRE_MARKER_DIMENSIONS.x * HALF,
  TERRITOIRE_MARKER_DIMENSIONS.y * HALF
);

const territoireIconMarkerSvg = (count: number): string => `
<div class="marker-group">
  <div class="marker-group-bg rounded-circle shadow-sm"></div>
    <div class="marker-group-bg rounded-circle bg-white "></div>
    <div class="marker-group-fg rounded-circle d-flex bg-primary">
      <span class="m-auto text-white fw-bold fs-6">${count}</span>
    </div>
  </div>
</div>`;

const TERRITOIRE_DIV_ICON = (count: number, highlight: MarkerHighlight): DivIcon =>
  new DivIcon({
    className: territoireMarkerHighlightClass(highlight),
    html: territoireIconMarkerSvg(count),
    iconAnchor: TERRITOIRE_ICON_ANCHOR,
    iconSize: TERRITOIRE_MARKER_DIMENSIONS,
    popupAnchor: [0, -TERRITOIRE_MARKER_DIMENSIONS.y]
  });

const TERRITOIRE_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: '',
  hover: 'marker-hover'
};

const territoireMarkerHighlightClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : TERRITOIRE_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

export const territoireMarkerFactory: MarkerFactory<TerritoireMarkerProperties, DivIcon> = (
  properties: MarkerProperties<TerritoireMarkerProperties>
): DivIcon => TERRITOIRE_DIV_ICON(properties.count, properties.highlight);
