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

export type DivIconMarkerFactory<T> = MarkerFactory<T, DivIcon>;

const lieuMediationIconMarkerSvg: string = `
<svg class="marker default-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 52">
  <ellipse class="default-marker-shadow" cx="24" cy="48" rx="12" ry="4"/>
  <path d="m23.74 45.73.707.66.683-.683c2.038-2.04 4.04-3.864 5.934-5.588l.179-.163c6.32-5.755 11.624-10.585 11.624-18.493C42.867 11.267 34.61 3 24.423 3 14.235 3 5.978 11.267 5.978 21.463c0 4.152 1.08 7.233 3.179 10.152 2.04 2.84 5.05 5.523 8.833 8.899l.078.07a316.5 316.5 0 0 1 5.672 5.147Zm6.509-24.267a5.83 5.83 0 0 1-5.826 5.833 5.83 5.83 0 0 1-5.826-5.833 5.83 5.83 0 0 1 5.826-5.833 5.83 5.83 0 0 1 5.826 5.833Z" stroke="#fff" stroke-width="2"/>
</svg>`;

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

export const lieuMediationNumeriqueMerkerFactory: DivIconMarkerFactory<LieuMediationNumeriqueMarkerProperties> = (
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
