import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation } from '../../../../core/presenters';
import { Cluster } from '../../../models';
import { LieuMediationNumeriqueOnMapPresentation } from '../../../presenters';

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
  @Input() public lieuxMediationNumeriqueClusters: Cluster[] = [];
  @Input() public selectedId: string = '';
  @Input() public hoverId: string = '';
  @Input() public displayTooltip: boolean = true;

  @Output() public showDetails: EventEmitter<LieuMediationNumeriqueOnMapPresentation> =
    new EventEmitter<LieuMediationNumeriqueOnMapPresentation>();

  @Output() public selectCluster: EventEmitter<Localisation> = new EventEmitter<Localisation>();

  @Output() public highlight: EventEmitter<LieuMediationNumeriqueOnMapPresentation | undefined> = new EventEmitter<
    LieuMediationNumeriqueOnMapPresentation | undefined
  >();
}
