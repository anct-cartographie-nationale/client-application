import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { RegionPresentation } from '../../../../core';

export type RegionMarkerProperties = MarkerProperties<
  RegionPresentation & {
    count: number;
    highlight: MarkerHighlight;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const REGION_MARKER_WIDTH: number = 48;
const REGION_MARKER_HEIGHT: number = 49;
const REGION_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(REGION_MARKER_WIDTH, REGION_MARKER_HEIGHT, ROUND_FALSE);

const REGION_ICON_ANCHOR: LeafletPoint = new LeafletPoint(REGION_MARKER_DIMENSIONS.x * HALF, REGION_MARKER_DIMENSIONS.y * HALF);

const regionIconMarkerSvg = (count: number): string => `
<div class="marker-group">
  <div class="marker-group-bg rounded-circle shadow-sm"></div>
    <div class="marker-group-bg rounded-circle bg-white "></div>
    <div class="marker-group-fg rounded-circle d-flex bg-primary">
      <span class="m-auto text-white fw-bold fs-6">${count}</span>
    </div>
  </div>
</div>`;

const REGION_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: '',
  hover: 'marker-hover'
};

const regionMarkerHighlightClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : REGION_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

const REGION_DIV_ICON = (count: number, highlight: MarkerHighlight): DivIcon =>
  new DivIcon({
    className: regionMarkerHighlightClass(highlight),
    html: regionIconMarkerSvg(count),
    iconAnchor: REGION_ICON_ANCHOR,
    iconSize: REGION_MARKER_DIMENSIONS,
    popupAnchor: [0, -REGION_MARKER_DIMENSIONS.y]
  });

export const regionMarkerFactory: MarkerFactory<RegionMarkerProperties, DivIcon> = (
  properties: MarkerProperties<RegionMarkerProperties>
): DivIcon => REGION_DIV_ICON(properties.count, properties.highlight);
