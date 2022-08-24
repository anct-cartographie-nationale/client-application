import { MarkerFactory, MarkerProperties } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { RegionPresentation } from '../../../../core';

export type RegionMarkerProperties = MarkerProperties<
  RegionPresentation & {
    count: number;
    index: number;
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const REGION_FIRST_RESULT_MARKER_WIDTH: number = 114;
const REGION_FIRST_RESULT_MARKER_HEIGHT: number = 110;
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
<svg class="marker region-marker" width="117" height="104" viewBox="0 0 117 104" xmlns="http://www.w3.org/2000/svg">
  <path d="M87.556 72.589V38.656L58.218 21.684 28.879 38.656v33.933l29.339 16.975 29.338-16.975Zm0-43.859V14.635L75.37 7.585l-12.184 7.05V28.73l12.184 7.05 12.185-7.05ZM24.539 81.942V67.847l-12.185-7.05L.166 67.85v14.095l12.185 7.05 12.184-7.05m28.71 14.095V81.945l-12.185-7.05-12.184 7.05V96.04l12.184 7.05 12.185-7.05ZM41.171 22.247V8.024L28.876.91 16.577 8.024v14.223l12.295 7.113 12.3-7.113Zm15.695-6.676V8.536l-6.082-3.52-6.082 3.52v7.035l6.082 3.52 6.082-3.52ZM32.497 56.732v-9.205l-7.958-4.604-7.959 4.604v9.205l7.959 4.604 7.958-4.604Zm84.337 14.469v-12.71l-10.991-6.36-10.991 6.36V71.2l10.991 6.359 10.991-6.359ZM95.733 86.61v-7.343l-6.348-3.67-6.348 3.67v7.343l6.348 3.671 6.348-3.671Zm11.246-39.82v-7.343l-6.348-3.67-6.347 3.67v7.343l6.347 3.67 6.348-3.67Z"/>
  <path d="M78.562 67.388V43.856L58.214 32.085 37.866 43.856v23.532L58.214 79.16l20.348-11.772Z" fill="#fff"/>
</svg>`;

const REGION_FIRST_RESULT_DIV_ICON = (count: number): DivIcon =>
  new DivIcon({
    className: '',
    html: regionFirstResultIconMarkerSvg(count),
    iconAnchor: REGION_FIRST_RESULT_ICON_ANCHOR,
    iconSize: REGION_FIRST_RESULT_MARKER_DIMENSIONS,
    popupAnchor: [0, -REGION_FIRST_RESULT_MARKER_DIMENSIONS.y]
  });

const REGION_SECOND_RESULT_MARKER_WIDTH: number = 63;
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
<svg class="marker region-marker" width="62" height="73" viewBox="0 0 62 73" xmlns="http://www.w3.org/2000/svg">
  <path d="M54.83 49.623V23.77L32.166 10.839 9.499 23.77v25.852l22.664 12.932 22.664-12.932m.003-33.412V5.47L45.417.1l-9.413 5.37v10.74l9.413 5.37 9.413-5.37ZM28.327 67.49V56.75l-9.413-5.37L9.5 56.75v10.74l9.413 5.37 9.413-5.37ZM12.299 37.542V30.53L6.15 27.022 0 30.53v7.012l6.148 3.508 6.148-3.508M61.15 60.305v-5.594l-4.904-2.797-4.904 2.797v5.594l4.904 2.797 4.903-2.797ZM21.766 13.636V8.044l-4.904-2.797-4.904 2.797v5.594l4.904 2.797 4.904-2.797"/>
  <path d="M47.885 45.661V27.733l-15.72-8.968-15.719 8.968V45.66l15.72 8.968 15.719-8.968Z" fill="#fff"/>
</svg>`;

const REGION_SECOND_RESULT_DIV_ICON = (count: number): DivIcon =>
  new DivIcon({
    className: '',
    html: regionSecondResultIconMarkerSvg(count),
    iconAnchor: REGION_SECOND_RESULT_ICON_ANCHOR,
    iconSize: REGION_SECOND_RESULT_MARKER_DIMENSIONS,
    popupAnchor: [0, -REGION_SECOND_RESULT_MARKER_DIMENSIONS.y]
  });

const REGION_MARKER_WIDTH: number = 46;
const REGION_MARKER_HEIGHT: number = 47;
const REGION_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(REGION_MARKER_WIDTH, REGION_MARKER_HEIGHT, ROUND_FALSE);

const REGION_ICON_ANCHOR: LeafletPoint = new LeafletPoint(REGION_MARKER_DIMENSIONS.x * HALF, REGION_MARKER_DIMENSIONS.y * HALF);

const regionIconMarkerSvg = (count: number): string => `
<div class="position-absolute top-50 start-50 translate-middle">
  <b class="text-primary">${count}</b>
</div>
<svg class="marker region-marker" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
  <path d="M40.177 34.493V15.304L23.659 5.707 7.14 15.304v19.19l16.517 9.598 16.518-9.599M9.18 25.526v-5.205L4.7 17.718.218 20.32v5.205l4.48 2.604 4.48-2.604M44.076 8.309V3.104L39.596.5l-4.48 2.604v5.205l4.48 2.603 4.48-2.603Zm.706 34.115v-4.152l-3.574-2.076-3.573 2.076v4.152l3.573 2.076 3.574-2.076ZM15.777 7.781v-4.15l-3.573-2.076L8.63 3.631v4.152l3.574 2.076 3.573-2.076"/>
  <path d="M35.115 31.552V18.245L23.66 11.59l-11.455 6.656v13.307L23.66 38.21l11.456-6.657Z" fill="#fff"/>
</svg>`;

const REGION_DIV_ICON = (count: number): DivIcon =>
  new DivIcon({
    className: '',
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
      return REGION_FIRST_RESULT_DIV_ICON(properties.count);
    case 1:
      return REGION_SECOND_RESULT_DIV_ICON(properties.count);
    default:
      return REGION_DIV_ICON(properties.count);
  }
};
