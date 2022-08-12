import { FeatureCollection, Point } from 'geojson';

export type AddressTransferProperties = {
  label: string;
  context: string;
  x: number;
  y: number;
};

export type AddressTransfer = {
  version: string;
  attribution: string;
  licence: string;
  query: string;
  limit: number;
} & FeatureCollection<Point, AddressTransferProperties>;
