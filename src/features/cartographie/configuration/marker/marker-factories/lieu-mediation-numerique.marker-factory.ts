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
const LIEU_MEDIATION_NUMERIQUE_MARKER_HEIGHT_IN_PIXEL: number = 54;
const LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS: LeafletPoint = new LeafletPoint(
  LIEU_MEDIATION_NUMERIQUE_MARKER_WIDTH_IN_PIXEL,
  LIEU_MEDIATION_NUMERIQUE_MARKER_HEIGHT_IN_PIXEL,
  ROUND_FALSE
);

const lieuMediationIconMarkerSvg: string = `
<svg class="marker default-marker" xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 54">
  <ellipse class="marker-focus-active" cx="14" cy="54" rx="9" ry="3"/>
  <path d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z" stroke="#fff" stroke-width="1"/>
  <g class="marker-hover-active" filter="url(#hover)">
    <path d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z"/>
  </g>
  <path fill="#fff" d="M20.946 20.321v-7.719l-6.686-3.85-6.686 3.85v7.72l6.686 3.867Z"/>
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
  <circle class="marker-opening-status" cx="21" cy="39" r="5" stroke="#fff" stroke-width="2"/>
</svg>
`;

const cnfsIconMarkerSvg: string = `
<svg class="marker cnfs-marker" xmlns="http://www.w3.org/2000/svg" width="48" height="54" viewBox="0 0 48 54">
  <path class="cnfs-marker-out" d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z" stroke="#fff" stroke-width="1"/>
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
  <circle class="marker-opening-status" cx="21" cy="39" r="5" stroke="#fff" stroke-width="2"/>
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

const lieuMediationNumeriqueMarkerOpeningClass = (status?: OpeningStatus): string => {
  const uniformStatus = status?.includes('Fermé') ? 'Fermé' : status?.includes('Ferme bientôt') ? 'Ferme bientôt' : status;
  return uniformStatus == null ? 'marker-status-unknown' : LIEU_MEDIATION_NUMERIQUE_MARKER_OPENING_CLASSES_MAP[uniformStatus];
};

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
