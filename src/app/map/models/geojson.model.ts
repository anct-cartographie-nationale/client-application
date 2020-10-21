import { AddressGeometry } from './addressGeometry.model';

export class GeoJson {
  public geometry: AddressGeometry;
  public type: string;
  public properties: object;

  constructor(obj?: any) {
    Object.assign(this, obj, {
      geometry: obj && obj.geometry ? new AddressGeometry(obj.geometry) : null,
    });
  }
}
