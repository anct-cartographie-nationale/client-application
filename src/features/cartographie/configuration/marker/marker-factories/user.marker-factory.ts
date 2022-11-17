import { MarkerFactory } from '../markers.configuration';
import { DivIcon, Point as LeafletPoint } from 'leaflet';

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const USER_MARKER_SIZE: number = 28;
const USER_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(USER_MARKER_SIZE, USER_MARKER_SIZE, ROUND_FALSE);

const USER_ICON_ANCHOR: LeafletPoint = new LeafletPoint(USER_MARKER_DIMENSIONS.x * HALF, USER_MARKER_DIMENSIONS.y * HALF);

const userIconMarkerSvg = (): string => `
<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
  <circle style="fill:#000;fill-opacity:.54902;stroke-width:19.9299;stroke-linecap:square;paint-order:markers fill stroke" cx="14" cy="14" r="14"/>
  <circle style="fill:#0f0;fill-opacity:1;stroke-width:18.9946;stroke-linecap:square;paint-order:markers fill stroke" cx="14" cy="14" r="9"/>
</svg>`;

const USER_DIV_ICON = (): DivIcon =>
  new DivIcon({
    className: '',
    html: userIconMarkerSvg(),
    iconAnchor: USER_ICON_ANCHOR,
    iconSize: USER_MARKER_DIMENSIONS,
    popupAnchor: [0, -USER_MARKER_DIMENSIONS.y]
  });

export const userMarkerFactory: MarkerFactory<void, DivIcon> = (): DivIcon => USER_DIV_ICON();
