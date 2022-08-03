import { DivIcon, Point as LeafletPoint } from 'leaflet';
import { MarkerFactory, MarkerHighlight, MarkerProperties } from '../markers.configuration';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { OpeningStatus } from '../../../../../domain/presenters/horaires/horaires.presenter';
import { LabelNational } from 'projects/client-application/src/models';

export type LieuMediationNumeriqueMarkerProperties = MarkerProperties<
  LieuMediationNumeriqueListItemPresentation & {
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

const lieuMediationNumeriqueMarkerHtmlTemplate = (
  lieuMediationNumeriqueClass: string,
  labels_nationaux: LabelNational[]
): string =>
  labels_nationaux?.includes('CNFS')
    ? `<svg class="lieu-mediation-numerique-marker ${lieuMediationNumeriqueClass}" version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" width="250.90668" height="250.06667" viewBox="0 0 942.2 1080">
    <g id="g10" inkscape:groupmode="layer" inkscape:label="ink_ext_XXXXXX" transform="matrix(1.3333333,0,0,-1.3333333,0,210.06667)">
      <g id="g12" transform="scale(0.1)">
        <path
          d="M 468.129,1575.51 -0.00390625,1305.23 V 764.672 L 443.141,-0.0117188 h 49.98 L 936.285,764.672 v 540.558 l -468.156,270.28"
          style="fill: #e1000f; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          id="path14" />
        <path
          d="m 601.988,1112.23 h 177.41 v 102.43 L 468.129,1394.4 156.84,1214.66 V 855.234 L 468.129,675.488 779.398,855.234 v 102.438 h -177.41 v 154.558"
          style="fill: #ffffff; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          id="path16" />
        <path
          d="m 601.988,957.68 v 154.55 l -133.859,77.3 -133.856,-77.3 V 957.68 l 133.856,-77.309 133.859,77.309"
          style="fill: #000091; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          id="path18" />
      </g>
    </g>
 </svg>`
    : `
<svg class="lieu-mediation-numerique-marker ${lieuMediationNumeriqueClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="m23.74 45.73.707.66.683-.683c2.038-2.04 4.04-3.864 5.934-5.588l.179-.163c6.32-5.755 11.624-10.585 11.624-18.493C42.867 11.267 34.61 3 24.423 3 14.235 3 5.978 11.267 5.978 21.463c0 4.152 1.08 7.233 3.179 10.152 2.04 2.84 5.05 5.523 8.833 8.899l.078.07a316.5 316.5 0 0 1 5.672 5.147Zm6.509-24.267a5.83 5.83 0 0 1-5.826 5.833 5.83 5.83 0 0 1-5.826-5.833 5.83 5.83 0 0 1 5.826-5.833 5.83 5.83 0 0 1 5.826 5.833Z" stroke="#fff" stroke-width="2"/>
</svg>`;

const LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP: Record<MarkerHighlight, string> = {
  focus: 'lieu-mediation-numerique-marker-focus',
  hint: 'lieu-mediation-numerique-marker-hint'
};

const LIEU_MEDIATION_NUMERIQUE_MARKER_OPENING_CLASSES_MAP: Record<OpeningStatus, string> = {
  Fermé: '',
  'Ferme bientôt': 'lieu-mediation-numerique-marker-open',
  Ouvert: 'lieu-mediation-numerique-marker-open',
  'Ouvre bientôt': ''
};

const lieuMediationNumeriqueMarkerHighlightClass = (highlight?: MarkerHighlight): string =>
  highlight == null ? '' : LIEU_MEDIATION_NUMERIQUE_MARKER_HIGHLIGHT_CLASSES_MAP[highlight];

const lieuMediationNumeriqueMarkerOpeningClass = (status?: OpeningStatus): string =>
  status == null ? '' : LIEU_MEDIATION_NUMERIQUE_MARKER_OPENING_CLASSES_MAP[status];

export const lieuMediationNumeriqueMerkerFactory: DivIconMarkerFactory<LieuMediationNumeriqueMarkerProperties> = (
  properties: MarkerProperties<LieuMediationNumeriqueMarkerProperties>
): DivIcon =>
  new DivIcon({
    className: '',
    html: lieuMediationNumeriqueMarkerHtmlTemplate(
      [
        lieuMediationNumeriqueMarkerHighlightClass(properties.highlight),
        lieuMediationNumeriqueMarkerOpeningClass(properties.status)
      ].join(' '),
      properties.labels_nationaux
    ),
    iconAnchor: new LeafletPoint(
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.x * HALF,
      LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y
    ),
    iconSize: LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS,
    popupAnchor: [0, -LIEU_MEDIATION_NUMERIQUE_MARKER_DIMENSIONS.y]
  });
