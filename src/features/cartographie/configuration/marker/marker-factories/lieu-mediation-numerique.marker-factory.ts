import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { LabelNational, LieuMediationNumeriquePresentation, OpeningStatus } from '../../../../core';
import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';

export type LieuMediationNumeriqueMarkerProperties = MarkerProperties<
  LieuMediationNumeriquePresentation & {
    highlight?: MarkerHighlight;
    labels_nationaux: LabelNational[];
  }
>;

const HALF: number = 0.5;
const ROUND_FALSE: boolean = false;

const LIEU_MEDIATION_NUMERIQUE_MARKER_WIDTH_IN_PIXEL: number = 48;
const LIEU_MEDIATION_NUMERIQUE_MARKER_HEIGHT_IN_PIXEL: number = 48;
const LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  LIEU_MEDIATION_NUMERIQUE_MARKER_WIDTH_IN_PIXEL,
  LIEU_MEDIATION_NUMERIQUE_MARKER_HEIGHT_IN_PIXEL,
  ROUND_FALSE
);

const lieuMediationIconMarkerSvg: string = `
<svg class="marker default-marker" width="34" height="54" viewBox="0 0 34 54" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="marker-focus-active" cx="17" cy="47.5" rx="8" ry="4"/>
  <path d="M17 2 5 8.691v13.38l11.36 18.93h1.28L29 22.07V8.691l-12-6.69Z"/>
  <g class="marker-hover-active" filter="url(#hover)">
    <path d="M17 2 5 8.691v13.38l11.36 18.93h1.28L29 22.07V8.691l-12-6.69Z"/>
  </g>
  <path d="M17.244 1.564 17 1.428l-.244.136-12 6.69-.256.143V22.21l.071.118 11.36 18.93.146.242h1.846l.146-.242 11.36-18.93.071-.118V8.397l-.256-.143-12-6.69Z" stroke="#fff"/>
  <path d="M22.487 18.44v-6.118L17 9.262l-5.487 3.06v6.118L17 21.5l5.487-3.06Z" fill="#fff"/>
  <defs>
    <filter id="hover" x="0" y=".855" width="34" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix class="marker-hover-active" in="SourceAlpha" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/>
      <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1785_8086"/>
      <feBlend in="SourceGraphic" in2="effect1_dropShadow_1785_8086" result="shape"/>
    </filter>
  </defs>
</svg>
`;

const cnfsIconMarkerSvg: string = `
<svg class="marker cnfs-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 54">
  <path class="cnfs-marker-out" d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z"/>
  <g class="marker-hover-active" filter="url(#hover)">
    <path class="cnfs-marker-out" d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z"/>
  </g>
  <path class="cnfs-marker-in" d="M18.34 18.82v-4.71l-4.08-2.35-4.08 2.35v4.71l4.08 2.36z"/>
  <path d="M18.34 14.11h5.41v-3.12l-9.49-5.47-9.48 5.47v10.95l9.48 5.48 9.49-5.48v-3.12h-5.41l-4.08 2.36-4.08-2.36v-4.71l4.08-2.35z" fill="#fff"/>
  <defs>
    <filter id="hover" x="0" y=".855" width="48" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix class="marker-hover-active" in="SourceAlpha" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/>
      <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1785_8086"/>
      <feBlend in="SourceGraphic" in2="effect1_dropShadow_1785_8086" result="shape"/>
    </filter>
  </defs>
</svg>
`;

const lieuMediationNumeriqueMarkerHtmlTemplate = (labels_nationaux: LabelNational[]): string =>
  labels_nationaux?.includes('CNFS') ? cnfsIconMarkerSvg : lieuMediationIconMarkerSvg;

const LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: 'marker-focus',
  hover: 'marker-hover'
};

const LIEU_MEDIATION_NUMERIQUE_MARKER_OPENING_CLASSES_MAP: Record<OpeningStatus, string> = {
  Fermé: 'marker-status-closed',
  'Ferme bientôt': 'marker-status-open',
  Ouvert: 'marker-status-open',
  'Ouvre bientôt': 'marker-status-closed'
};

const lieuMediationNumeriqueMarkerHighlightClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

const lieuMediationNumeriqueMarkerOpeningClass = (status?: OpeningStatus): string =>
  status == null ? 'marker-status-unknown' : LIEU_MEDIATION_NUMERIQUE_MARKER_OPENING_CLASSES_MAP[status];

export const lieuMediationNumeriqueMarkerFactory: MarkerFactory<LieuMediationNumeriqueMarkerProperties, DivIcon> = (
  properties: MarkerProperties<LieuMediationNumeriqueMarkerProperties>
): DivIcon =>
  new DivIcon({
    className: [
      lieuMediationNumeriqueMarkerHighlightClass(properties.highlight),
      lieuMediationNumeriqueMarkerOpeningClass(properties.status)
    ].join(' '),
    html: lieuMediationNumeriqueMarkerHtmlTemplate(properties.labels_nationaux),
    iconAnchor: new LeafletPoint(
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.x * HALF,
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y
    ),
    iconSize: LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS,
    popupAnchor: [0, -LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y]
  });
