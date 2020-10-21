import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { GeoJson } from '../models/geojson.model';

@Injectable({
  providedIn: 'root',
})
export class GeojsonService {
  constructor(private http: HttpClient) {}

  /**
   * Retrive an address with a street national reference
   * @param idVoie Number
   */
  public getAddress(idVoie: number): Observable<Address> {
    return this.http
      .get('/base-adresse/base-adresse-nationale/streets' + '?id=' + idVoie)
      .pipe(map((data: { data: any[]; err: number }) => new Address(data.data[0])));
  }

  /**
   * Get GeoLocation with an address
   * @param address Address
   */
  public getCoord(address: Address): Observable<GeoJson> {
    return this.http
      .get('/geocoding/photon/api' + '?q=' + address.queryString())
      .pipe(map((data: { features: any[]; type: string }) => new GeoJson(data.features[0])));
  }
}
