import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { LieuMediationNumerique } from '../../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

export type LieuMediationNumeriqueMarkerProperties = MarkerProperties<
  LieuMediationNumerique & {
    highlight?: MarkerHighlight;
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

const lieuMediationNumeriqueMarkerHtmlTemplate = (lieuMediationNumeriqueClass: string): string => `
<svg class="lieu-mediation-numerique-marker ${lieuMediationNumeriqueClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="m23.74 45.73.707.66.683-.683c2.038-2.04 4.04-3.864 5.934-5.588l.179-.163c6.32-5.755 11.624-10.585 11.624-18.493C42.867 11.267 34.61 3 24.423 3 14.235 3 5.978 11.267 5.978 21.463c0 4.152 1.08 7.233 3.179 10.152 2.04 2.84 5.05 5.523 8.833 8.899l.078.07a316.5 316.5 0 0 1 5.672 5.147Zm6.509-24.267a5.83 5.83 0 0 1-5.826 5.833 5.83 5.83 0 0 1-5.826-5.833 5.83 5.83 0 0 1 5.826-5.833 5.83 5.83 0 0 1 5.826 5.833Z" stroke="#fff" stroke-width="2"/>
</svg>`;

const LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: 'lieu-mediation-numerique-marker-focus',
  hint: 'lieu-mediation-numerique-marker-hint'
};

const lieuMediationNumeriqueMarkerClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

export const lieuMediationNumeriqueMerkerFactory: DivIconMarkerFactory<LieuMediationNumeriqueMarkerProperties> = (
  properties: MarkerProperties<LieuMediationNumeriqueMarkerProperties>
): DivIcon =>
  new DivIcon({
    className: '',
    html: lieuMediationNumeriqueMarkerHtmlTemplate(lieuMediationNumeriqueMarkerClass(properties.highlight)),
    iconAnchor: new LeafletPoint(
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.x * HALF,
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y
    ),
    iconSize: LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS,
    popupAnchor: [0, -LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y]
  });
