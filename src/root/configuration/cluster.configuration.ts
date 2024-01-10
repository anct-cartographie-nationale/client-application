import { InjectionToken } from '@angular/core';

export type ClusterConfiguration = {
  radius: number;
  maxZoom: number;
};

export const CLUSTER_TOKEN: InjectionToken<ClusterConfiguration> = new InjectionToken<ClusterConfiguration>(
  'cluster.configuration'
);

export const CLUSTER_CONFIGURATION: ClusterConfiguration = {
  radius: 35,
  maxZoom: 16
};
