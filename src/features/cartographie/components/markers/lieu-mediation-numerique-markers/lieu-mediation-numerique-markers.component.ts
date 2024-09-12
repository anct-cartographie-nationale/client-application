import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnyProps, ClusterFeature } from 'supercluster';
import { LieuMediationNumeriquePresentation } from '../../../../core/presenters';
import { ClustersPresenter } from '../../../../core/presenters/clusters';
import { Cluster } from '../../../models';
import { LieuMediationNumeriqueOnMapPresentation } from '../../../presenters';
import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type LieuMediationNumeriqueCluster = {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number] };
  properties: { cluster?: boolean } | LieuMediationNumeriquePresentation;
};

const matchingLieuInForCluster = (id: string) => (cluster: Cluster) => cluster.properties['id'] === id;

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

  @Output() public selectCluster: EventEmitter<ClusterFeature<AnyProps>> = new EventEmitter<ClusterFeature<AnyProps>>();

  @Output() public highlight: EventEmitter<string> = new EventEmitter<string>();

  public constructor(public clustersPresenter: ClustersPresenter) {}

  public highlightedLieu: Observable<LieuMediationNumeriqueOnMapPresentation | undefined> = this.highlight.pipe(
    map((id: string) => {
      return this.lieuxMediationNumeriqueClusters.find(matchingLieuInForCluster(id))?.properties as
        | LieuMediationNumeriqueOnMapPresentation
        | undefined;
    })
  );
  protected readonly DispositifProgrammeNational = DispositifProgrammeNational;
}
