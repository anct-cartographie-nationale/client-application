import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  LieuMediationNumeriqueDetailsPresentation,
  LieuMediationNumeriqueOnMapPresentation,
  ModaliteAccompagnementPresentation,
  SourcePresentation
} from '../../../presenters';
import { AnyProps, ClusterFeature, PointFeature } from 'supercluster';
import {
  Contact,
  LabelNational,
  Localisation,
  Presentation,
  PublicAccueilli,
  Service,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { HorairesPresentation, LieuMediationNumeriquePresentation, OpeningState } from '../../../../core/presenters';
import { Aidant } from '../../../../core/models';

type LieuMediationNumeriqueFeature = { cluster: boolean } | { id: string; nom: string; labels_nationaux?: LabelNational[] };

export type LieuMediationNumeriqueCluster = {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number] };
  properties: { cluster?: boolean } | LieuMediationNumeriquePresentation;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieu-mediation-numerique-markers',
  templateUrl: './lieu-mediation-numerique-markers.component.html'
})
export class LieuMediationNumeriqueMarkersComponent {
  @Input() public lieuxMediationNumeriqueClusters: (PointFeature<AnyProps> | ClusterFeature<AnyProps>)[] = [];
  @Input() public selectedId: string = '';
  @Input() public hoverId: string = '';
  @Input() public displayTooltip: boolean = true;

  @Output() public showDetails: EventEmitter<LieuMediationNumeriqueOnMapPresentation> =
    new EventEmitter<LieuMediationNumeriqueOnMapPresentation>();

  @Output() public selectCluster: EventEmitter<Localisation> = new EventEmitter<Localisation>();

  @Output() public highlight: EventEmitter<LieuMediationNumeriqueOnMapPresentation | undefined> = new EventEmitter<
    LieuMediationNumeriqueOnMapPresentation | undefined
  >();

  public trackByLieuId(_: number, lieu: LieuMediationNumeriqueOnMapPresentation) {
    return lieu.id;
  }
}
