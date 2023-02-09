import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation, OpeningState } from '../../../../core';
import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';

export type LieuMediationNumeriqueMarkerProperties = MarkerProperties<
  LieuMediationNumeriquePresentation & {
    status?: OpeningState;
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
<svg class="marker-default" width="40" height="65" viewBox="0 0 40 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="marker-body">
    <path class="marker-shadow" d="M20 6C11.2 6 4 13.2 4 22s16 32 16 32 16-23.2 16-32S28.8 6 20 6zm0 21c-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3S22.9 27 20 27z"/>
    <path class="marker-shape" d="M20 6C11.2 6 4 13.2 4 22s16 32 16 32 16-23.2 16-32S28.8 6 20 6zm0 21c-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3S22.9 27 20 27z"/>
    <circle class="marker-opening-status" cx="27.2" cy="42.5" r="6.6"/>
  </g>
  <ellipse class="marker-base" cx="20" cy="61.5" rx="10" ry="2.5"/>
</svg>`;

const cnfsIconMarkerSvg: string = `
<svg class="marker-cnfs" width="40" height="65" viewBox="0 0 40 65" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="marker-body">
    <path class="marker-shadow" d="m20.8 54.1 13.6-23.6V13.8L20 5.5 5.6 13.8v16.7l13.6 23.6z"/>
    <path class="marker-shape" d="m20.8 54.1 13.6-23.6V13.8L20 5.5 5.6 13.8v16.7l13.6 23.6z"/>
    <path class="marker-shape-out" d="M29.6 16.6 20 11.1l-9.6 5.5v11.1l9.6 5.5 9.6-5.5v-3.2h-5.5v-4.7h5.5z"/>
    <path class="marker-shape-in" d="M15.9 19.8v4.7l4.1 2.4 4.1-2.4v-4.7L20 17.4z"/>
    <circle class="marker-opening-status" cx="27.2" cy="42.5" r="6.6"/>
  </g>
  <ellipse class="marker-base" cx="20" cy="61.5" rx="10" ry="2.5"/>
</svg>
`;

const lieuMediationNumeriqueMarkerHtmlTemplate = (labels_nationaux: LabelNational[]): string =>
  labels_nationaux?.includes(LabelNational.CNFS) ? cnfsIconMarkerSvg : lieuMediationIconMarkerSvg;

const LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: 'marker-focus',
  hover: 'marker-hover'
};

const lieuMediationNumeriqueMarkerHighlightClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

const lieuMediationNumeriqueMarkerOpeningClass = (status?: OpeningState): string => {
  switch (status?.label) {
    case 'Ouvert':
      return 'marker-status-open';
    case 'Fermé':
      return 'marker-status-closed';
    default:
      return 'marker-status-unknown';
  }
};

export const lieuMediationNumeriqueMarkerFactory: MarkerFactory<LieuMediationNumeriqueMarkerProperties, DivIcon> = (
  properties: MarkerProperties<LieuMediationNumeriqueMarkerProperties>
): DivIcon =>
  new DivIcon({
    className: [
      lieuMediationNumeriqueMarkerHighlightClass(properties.highlight),
      lieuMediationNumeriqueMarkerOpeningClass(properties.status)
    ]
      .filter((className: string) => className)
      .join(' '),
    html: lieuMediationNumeriqueMarkerHtmlTemplate(properties.labels_nationaux),
    iconAnchor: new LeafletPoint(
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.x * HALF,
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y
    ),
    iconSize: LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS,
    popupAnchor: [0, -LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y]
  });
