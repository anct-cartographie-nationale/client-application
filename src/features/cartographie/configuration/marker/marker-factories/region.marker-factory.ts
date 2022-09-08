import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { RegionPresentation } from '../../../../core';

export type RegionMarkerProperties = MarkerProperties<
  RegionPresentation & {
    count: number;
    index: number;
    highlight: MarkerHighlight;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const REGION_FIRST_RESULT_MARKER_WIDTH: number = 116;
const REGION_FIRST_RESULT_MARKER_HEIGHT: number = 104;
const REGION_FIRST_RESULT_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  REGION_FIRST_RESULT_MARKER_WIDTH,
  REGION_FIRST_RESULT_MARKER_HEIGHT,
  ROUND_FALSE
);

const REGION_FIRST_RESULT_ICON_ANCHOR: LeafletPoint = new LeafletPoint(
  REGION_FIRST_RESULT_MARKER_DIMENSIONS.x * HALF,
  REGION_FIRST_RESULT_MARKER_DIMENSIONS.y * HALF
);

const regionFirstResultIconMarkerSvg = (count: number): string => `
<div class="position-absolute top-50 start-50 translate-middle">
  <b class="text-primary fs-6">${count}</b>
</div>
<svg class="marker region-marker" xmlns="http://www.w3.org/2000/svg" width="117" height="104" viewBox="0 0 117 104">
	<path d="M91.5,24.7V10.6L79.3,3.5l-12.2,7.1v14.1 l12.2,7.1L91.5,24.7"/>
	<path d="M24.4,82V67.9l-12.2-7.1l-12.2,7.1V82 L12.1,89L24.4,82"/>
	<path d="M53.1,96.1V82l-12.2-7.1L28.7,82v14.1 l12.2,7.1L53.1,96.1"/>
	<path d="M41,22.2V8L28.7,0.9L16.4,8v14.2l12.3,7.1 L41,22.2"/>
	<path d="M56.8,15.5v-7L50.7,5l-6.1,3.5v7l6.1,3.5 L56.8,15.5"/>
	<path d="M32.3,56.7v-9.2l-8-4.6l-8,4.6v9.2l8,4.6 L32.3,56.7"/>
	<path d="M116.9,71.2V58.5l-11-6.4l-11,6.4v12.7 l11,6.4L116.9,71.2"/>
	<path  d="M95.8,86.6v-7.3l-6.4-3.7L83,79.3v7.3 l6.4,3.7L95.8,86.6"/>
	<path  d="M107,46.8v-7.3l-6.4-3.7l-6.4,3.7v7.3 l6.4,3.7L107,46.8"/>
	<path  fill="#fff" style="filter: drop-shadow(1px 3px 3px rgb(0,0,0,0.4));" class="marker-hover-active" d="M89.9,70.1V33.9L58.5,15.7L27.1,33.9v36.3 l31.4,18.1L89.9,70.1"/>
	<path  d="M87.9,69V35L58.5,18L29.1,35v34l29.4,17 L87.9,69"/>
	<path  fill="#fff" d="M78.9,63.8V40.2L58.5,28.4L38.1,40.2v23.6 l20.4,11.8L78.9,63.8"/>
</svg>`;

const REGION_FIRST_RESULT_DIV_ICON = (count: number, highlight: MarkerHighlight): DivIcon =>
  new DivIcon({
    className: regionMarkerHighlightClass(highlight),
    html: regionFirstResultIconMarkerSvg(count),
    iconAnchor: REGION_FIRST_RESULT_ICON_ANCHOR,
    iconSize: REGION_FIRST_RESULT_MARKER_DIMENSIONS,
    popupAnchor: [0, -REGION_FIRST_RESULT_MARKER_DIMENSIONS.y]
  });

const REGION_SECOND_RESULT_MARKER_WIDTH: number = 61;
const REGION_SECOND_RESULT_MARKER_HEIGHT: number = 73;
const REGION_SECOND_RESULT_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  REGION_SECOND_RESULT_MARKER_WIDTH,
  REGION_SECOND_RESULT_MARKER_HEIGHT,
  ROUND_FALSE
);

const REGION_SECOND_RESULT_ICON_ANCHOR: LeafletPoint = new LeafletPoint(
  REGION_SECOND_RESULT_MARKER_DIMENSIONS.x * HALF,
  REGION_SECOND_RESULT_MARKER_DIMENSIONS.y * HALF
);

const regionSecondResultIconMarkerSvg = (count: number): string => `
<div class="position-absolute top-50 start-50 translate-middle">
  <b class="text-primary">${count}</b>
</div>
<svg class="marker region-marker" xmlns="http://www.w3.org/2000/svg" width="62" height="73" viewBox="0 0 62 73">
	<path d="M55.3,16.2V5.4L46,0l-9.3,5.4v10.8l9.3,5.4 L55.3,16.2"/>
	<path d="M29.1,67.6V56.8l-9.3-5.4l-9.3,5.4v10.8 l9.3,5.4L29.1,67.6"/>
	<path d="M13.2,37.6v-7L7.1,27L1,30.5v7l6.1,3.5 L13.2,37.6"/>
	<path d="M59.5,60.4v-5.6L54.6,52l-4.9,2.8v5.6 l4.9,2.8L59.5,60.4"/>
	<path d="M22.6,13.6V8l-4.9-2.8L12.9,8v5.6l4.9,2.8 L22.6,13.6"/>
	<path  fill="#fff" style="filter: drop-shadow(1px 3px 3px rgb(0,0,0,0.4));" class="marker-hover-active" d="M55.5,50.6V22.4L31,8.2L6.5,22.4v28.2 L31,64.8L55.5,50.6"/>
	<path d="M53.5,49.5V23.5L31,10.6l-22.5,13v25.9 l22.5,13L53.5,49.5"/>
	<path  fill="#fff" d="M46.6,45.5v-18l-15.6-9l-15.6,9v18l15.6,9 L46.6,45.5"/>
</svg>`;

const REGION_SECOND_RESULT_DIV_ICON = (count: number, highlight: MarkerHighlight): DivIcon =>
  new DivIcon({
    className: regionMarkerHighlightClass(highlight),
    html: regionSecondResultIconMarkerSvg(count),
    iconAnchor: REGION_SECOND_RESULT_ICON_ANCHOR,
    iconSize: REGION_SECOND_RESULT_MARKER_DIMENSIONS,
    popupAnchor: [0, -REGION_SECOND_RESULT_MARKER_DIMENSIONS.y]
  });

const REGION_MARKER_WIDTH: number = 48;
const REGION_MARKER_HEIGHT: number = 49;
const REGION_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(REGION_MARKER_WIDTH, REGION_MARKER_HEIGHT, ROUND_FALSE);

const REGION_ICON_ANCHOR: LeafletPoint = new LeafletPoint(REGION_MARKER_DIMENSIONS.x * HALF, REGION_MARKER_DIMENSIONS.y * HALF);

const regionIconMarkerSvg = (count: number): string => `
<div class="position-absolute top-50 start-50 translate-middle">
  <b class="text-primary">${count}</b>
</div>
<svg class="marker region-marker" xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49">
	<path d="M12.5,43.2v-5.2L8,35.5l-4.5,2.6v5.2L8,45.8 L12.5,43.2"/>
	<path d="M39.9,11.6V6.4l-4.5-2.6l-4.5,2.6v5.2 l4.5,2.6L39.9,11.6"/>sur le
	<path d="M44.6,43.9v-4.1L41,37.7l-3.6,2.1v4.1L41,46 L44.6,43.9"/>
	<path d="M8.9,12.4v-2.2L7,9.1l-1.9,1.1v2.2L7,13.5 L8.9,12.4"/>
	<path  fill="#fff" style="filter: drop-shadow(1px 3px 3px rgb(0,0,0,0.4));" class="marker-hover-active" d="M40.4,33.7V15.3L24.5,6.1L8.6,15.3v18.4 l15.9,9.2L40.4,33.7"/>
	<path d="M38.4,32.5V16.5l-13.9-8l-13.9,8v16.1 l13.9,8L38.4,32.5"/>
	<path  fill="#fff" d="M34.1,30.1V18.9l-9.6-5.6l-9.6,5.6v11.1 l9.6,5.6L34.1,30.1"/>
</svg>`;

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
): DivIcon => {
  switch (properties.index) {
    case 0:
      return REGION_FIRST_RESULT_DIV_ICON(properties.count, properties.highlight);
    case 1:
      return REGION_SECOND_RESULT_DIV_ICON(properties.count, properties.highlight);
    default:
      return REGION_DIV_ICON(properties.count, properties.highlight);
  }
};
