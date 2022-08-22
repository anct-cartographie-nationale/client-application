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
`;

const cnfsIconMarkerSvg: string = `
<svg class="marker cnfs-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path class="cnfs-marker-out" d="M14.26 0L0 8.23V24.7L13.5 48h1.52l13.5-23.3V8.23z"/>
  <path class="cnfs-marker-in" d="M18.34 18.82v-4.71l-4.08-2.35-4.08 2.35v4.71l4.08 2.36z"/>
  <path d="m 18.34,14.11 h 5.41 V 10.99 L 14.26,5.52 4.78,10.99 v 10.95 l 9.48,5.48 9.49,-5.48 v -3.12 h -5.41 l -4.08,2.36 -4.08,-2.36 v -4.71 l 4.08,-2.35 z" fill="#fff"/>
</svg>`;

const lieuMediationNumeriqueMarkerHtmlTemplate = (labels_nationaux: LabelNational[]): string =>
  labels_nationaux?.includes('CNFS') ? cnfsIconMarkerSvg : lieuMediationIconMarkerSvg;

const LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: 'marker-focus',
  hint: 'marker-hint'
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
