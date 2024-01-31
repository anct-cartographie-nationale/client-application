import { FeatureCollection, Point } from 'geojson';
import { AddressType } from '../../models';

export type AddressTransferProperties = {
  id: string;
  label: string;
  context: string;
  type: AddressType;
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
