import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation, OpeningStatus } from '../../../../core';
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
<svg class="marker default-marker" width="26" height="39" viewBox="0 0 26 39" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="marker-hover-active" filter="url(#hover)">
    <path d="M13 36.1424C12.9534 36.0769 12.9031 36.0061 12.8494 35.9302C12.4952 35.4305 11.989 34.7086 11.3814 33.8208C10.1658 32.0448 8.54578 29.6072 6.92659 26.9589C5.30635 24.3088 3.69231 21.4565 2.48496 18.8495C1.26747 16.2206 0.5 13.9158 0.5 12.3333C0.5 5.82595 6.07501 0.5 13 0.5C19.925 0.5 25.5 5.82595 25.5 12.3333C25.5 13.9158 24.7325 16.2206 23.515 18.8495C22.3077 21.4565 20.6937 24.3088 19.0734 26.9589C17.4542 29.6072 15.8342 32.0448 14.6186 33.8208C14.011 34.7086 13.5048 35.4305 13.1506 35.9302C13.0969 36.0061 13.0466 36.0769 13 36.1424ZM8.16667 12.0702C8.16667 14.6402 10.357 16.6813 13 16.6813C15.643 16.6813 17.8333 14.6402 17.8333 12.0702C17.8333 9.50027 15.643 7.45911 13 7.45911C10.357 7.45911 8.16667 9.50027 8.16667 12.0702Z" fill="#000091" stroke="white"/>
  </g>
  <path d="M13 37.1424C12.9534 37.0769 12.9031 37.0061 12.8494 36.9302C12.4952 36.4305 11.989 35.7086 11.3814 34.8208C10.1658 33.0448 8.54578 30.6072 6.92659 27.9589C5.30635 25.3088 3.69231 22.4565 2.48496 19.8495C1.26747 17.2206 0.5 14.9158 0.5 13.3333C0.5 6.82595 6.07501 1.5 13 1.5C19.925 1.5 25.5 6.82595 25.5 13.3333C25.5 14.9158 24.7325 17.2206 23.515 19.8495C22.3077 22.4565 20.6937 25.3088 19.0734 27.9589C17.4542 30.6072 15.8342 33.0448 14.6186 34.8208C14.011 35.7086 13.5048 36.4305 13.1506 36.9302C13.0969 37.0061 13.0466 37.0769 13 37.1424ZM8.16667 13.0702C8.16667 15.6402 10.357 17.6813 13 17.6813C15.643 17.6813 17.8333 15.6402 17.8333 13.0702C17.8333 10.5003 15.643 8.45911 13 8.45911C10.357 8.45911 8.16667 10.5003 8.16667 13.0702Z" fill="#000091" stroke="white"/>
  <defs>
    <filter id="hover" x="0" y="0" width="34" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix class="marker-hover-active" in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2039_188017"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2039_188017" result="shape"/>
    </filter>
  </defs>
  <circle class="marker-opening-status" cx="19" cy="30" r="5" fill="#000091" stroke="white" stroke-width="2"/>
  <circle  class="marker-status-closed" cx="19" cy="30" r="5" fill="#929292" stroke="white" stroke-width="2"/>
</svg>
  `;

// const lieuMediationIconMarkerSvg: string = `
// <svg class="marker default-marker" xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 54">
//   <ellipse class="marker-focus-active" cx="14" cy="54" rx="9" ry="3"/>
//   <path d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z" stroke="#fff" stroke-width="1"/>
//   <g class="marker-hover-active" filter="url(#hover)">
//     <path d="M14.26 0 0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z"/>
//   </g>
//   <path fill="#fff" d="M20.946 20.321v-7.719l-6.686-3.85-6.686 3.85v7.72l6.686 3.867Z"/>
//   <defs>
//     <filter id="hover" x="0" y=".855" width="48" height="54" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//       <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//       <feColorMatrix class="marker-hover-active" in="SourceAlpha" result="hardAlpha"/>
//       <feOffset dy="4"/>
//       <feGaussianBlur stdDeviation="2"/>
//       <feComposite in2="hardAlpha" operator="out"/>
//       <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/>
//       <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1785_8086"/>
//       <feBlend in="SourceGraphic" in2="effect1_dropShadow_1785_8086" result="shape"/>
//     </filter>
//   </defs>
//   <circle class="marker-opening-status" cx="21" cy="39" r="5" stroke="#fff" stroke-width="2"/>
// </svg>
// `;

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
  labels_nationaux?.includes(LabelNational.CNFS) ? cnfsIconMarkerSvg : lieuMediationIconMarkerSvg;

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
