import { AnyProps, ClusterFeature, PointFeature } from 'supercluster';

export type Cluster = PointFeature<AnyProps> | ClusterFeature<AnyProps>;
