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
<svg class="marker default-marker" width="24" height="46" viewBox="0 0 24 46" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="default-marker-shadow" cx="12" cy="42" rx="12" ry="4"/>
  <path d="M12 .8 0 7.491v13.38l11.36 18.93h1.28L24 20.87V7.491L12 .801Z"/>
  <path fill="#fff" d="M17.487 17.24v-6.118L12 8.062l-5.487 3.06v6.118L12 20.3l5.487-3.06Z"/>
</svg>
<svg class="marker-hover-active" width="34" height="54" viewBox="0 0 34 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1785_8086)">
<ellipse cx="17" cy="47.5002" rx="8" ry="4" fill="#E1000F"/>
</g>
<g filter="url(#filter1_d_1785_8086)">
<path d="M17 2.00024L5 8.69116V22.0711L16.3598 41.0002H17.6402L29 22.0711V8.69116L17 2.00024Z" fill="#929292"/>
<path d="M17.2435 1.56354L17 1.42777L16.7565 1.56354L4.7565 8.25445L4.5 8.39747V8.69116V22.0711V22.2096L4.57128 22.3284L15.9311 41.2575L16.0768 41.5002H16.3598H17.6402H17.9232L18.0689 41.2575L29.4287 22.3284L29.5 22.2096V22.0711V8.69116V8.39747L29.2435 8.25445L17.2435 1.56354Z" stroke="white"/>
</g>
<path d="M22.4866 18.4397V12.3225L16.9999 9.26294L11.5132 12.3225V18.4397L16.9999 21.4993L22.4866 18.4397Z" fill="white"/>
<defs>
<filter id="filter0_d_1785_8086" x="6" y="43.0002" width="22" height="11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1785_8086"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1785_8086" result="shape"/>
</filter>
<filter id="filter1_d_1785_8086" x="0" y="0.855286" width="34" height="49.145" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1785_8086"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1785_8086" result="shape"/>
</filter>
</defs>
</svg>
`;

const cnfsIconMarkerSvg: string = `
<svg class="marker cnfs-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path class="cnfs-marker-out" d="M14.26 0L0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z"/>
  <path class="cnfs-marker-in" d="M18.34 18.82v-4.71l-4.08-2.35-4.08 2.35v4.71l4.08 2.36z"/>
  <path d="m 18.34,14.11 h 5.41 V 10.99 L 14.26,5.52 4.78,10.99 v 10.95 l 9.48,5.48 9.49,-5.48 v -3.12 h -5.41 l -4.08,2.36 -4.08,-2.36 v -4.71 l 4.08,-2.35 z" fill="#fff"/>
</svg>
<svg class="marker-hover-active" width="52" height="72" viewBox="0 0 32 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1785_8196)">
<ellipse cx="16" cy="45.5002" rx="8" ry="2.5" fill="#E1000F"/>
</g>
<g filter="url(#filter1_d_1785_8196)">
<path d="M16.0061 0.000244141L4.11523 6.86085V20.5821L15.3637 40.0002H16.6364L27.8849 20.5821V6.86085L16.0061 0.000244141Z" fill="#E10814"/>
<path d="M4.61523 20.4477V7.14962L16.006 0.577571L27.3849 7.14947V20.4477L16.3483 39.5002H15.6519L4.61523 20.4477Z" stroke="white"/>
</g>
<path d="M19.4 11.7579H23.897V9.16393L16.0061 4.59424L8.10303 9.16393V18.2912L16.0061 22.8488L23.897 18.2912V15.6851H19.4V11.7579Z" fill="white"/>
<path d="M19.4001 15.6851V11.7578L16.0062 9.79419L12.6001 11.7578V15.6851L16.0062 17.6487L19.4001 15.6851Z" fill="#293173"/>
<defs>
<filter id="filter0_d_1785_8196" x="5" y="41.0002" width="22" height="11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1785_8196"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1785_8196" result="shape"/>
</filter>
<filter id="filter1_d_1785_8196" x="0.115234" y="0.000244141" width="31.7698" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1785_8196"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1785_8196" result="shape"/>
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
