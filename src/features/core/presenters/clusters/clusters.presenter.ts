import { Inject } from '@angular/core';
import Supercluster, { AnyProps, PointFeature } from 'supercluster';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { CLUSTER_TOKEN, ClusterConfiguration } from '../../../../root';
import { LieuMediationNumeriqueCluster } from '../../../cartographie/components';
import { LieuMediationNumeriquePresentation } from '../lieux-mediation-numerique';
import { MarkersPresenter } from '../markers/markers.presenter';
import { Cluster } from '../../../cartographie/models';

const toLieuMediationNumeriqueToGeoJsonFeature = (lieu: LieuMediationNumeriquePresentation): LieuMediationNumeriqueCluster => {
  return {
    type: 'Feature',
    properties: lieu,
    geometry: { type: 'Point', coordinates: [lieu.longitude, lieu.latitude] }
  };
};

const onlyCluster = (cluster: Cluster) => cluster.properties.cluster_id != null;

const toClusterIdMapEntry =
  (cluster: Cluster) =>
  (leave: PointFeature<AnyProps>): [string, number] =>
    [leave.properties['id'], cluster.properties.cluster_id];

export class ClustersPresenter {
  private _clusterIdMap: Map<string, number> = new Map();
  private _clusters: Cluster[] = [];
  private _superCluster: Supercluster;

  public constructor(
    private _markersPresenter: MarkersPresenter,
    @Inject(CLUSTER_TOKEN)
    _clusterConfiguration: ClusterConfiguration
  ) {
    this._superCluster = new Supercluster(_clusterConfiguration);
  }

  public fromLieuxMediationNumerique([lieuxMediationNumerique, zoom, [topLeft, bottomRight]]: [
    LieuMediationNumeriquePresentation[],
    number,
    [Localisation, Localisation]
  ]) {
    this._clusters = this._superCluster
      .load(lieuxMediationNumerique.map(toLieuMediationNumeriqueToGeoJsonFeature))
      .getClusters([topLeft.longitude, bottomRight.latitude, bottomRight.longitude, topLeft.latitude], zoom);

    this._clusterIdMap = new Map(
      this._clusters
        .filter(onlyCluster)
        .flatMap((cluster: Cluster) =>
          this._superCluster.getLeaves(cluster.properties.cluster_id).map(toClusterIdMapEntry(cluster))
        )
    );

    return this._clusters;
  }

  public expansionZoom(clusterId: number) {
    const curentZoom: number = this._markersPresenter.getZoom();
    const nextZoom: number = this._superCluster.getClusterExpansionZoom(clusterId);

    return nextZoom - curentZoom < 2 ? curentZoom + 2 : nextZoom;
  }

  public clusterIdFromLieuId(lieuId: string): number | undefined {
    return this._clusterIdMap.get(lieuId);
  }

  public lieuxIdsInClusterId(clusterId: number): string[] {
    try {
      return this._superCluster.getLeaves(clusterId).map((leave: PointFeature<AnyProps>) => leave.properties['id']);
    } catch {
      return [];
    }
  }
}
