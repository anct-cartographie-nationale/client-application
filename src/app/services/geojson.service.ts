import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { GeoJson } from '../map/models/geojson.model';

@Injectable({
  providedIn: 'root',
})
export class GeojsonService {
  constructor(private http: HttpClient) {}

  /**
   * Retrive an address with a street national reference
   * @param idVoie Number
   */
  public getAddressByIdVoie(idVoie: number): Observable<Address> {
    return this.http
      .get('/base-adresse/base-adresse-nationale/streets' + '?id=' + idVoie)
      .pipe(map((data: { data: any[]; err: number }) => new Address(data.data[0])));
  }

  /**
   * Retrive an address by geolocation
   * @param idVoie Number
   */
  public getAddressByCoord(longitude: number, latitude: number): Observable<any> {
    return this.http
      .get('/reverse/' + '?lon=' + longitude + '&lat=' + latitude)
      .pipe(map((data: { features: any[] }) => new GeoJson(data.features[0])));
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

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // :::                                                                         :::
  // :::  This routine calculates the distance between two points (given the     :::
  // :::  latitude/longitude of those points). It is being used to calculate     :::
  // :::  the distance between two locations using GeoDataSource (TM) prodducts  :::
  // :::                                                                         :::
  // :::  Definitions:                                                           :::
  // :::    South latitudes are negative, east longitudes are positive           :::
  // :::                                                                         :::
  // :::  Passed to function:                                                    :::
  // :::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  // :::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  // :::    unit = the unit you desire for results                               :::
  // :::           where: 'M' is statute miles (default)                         :::
  // :::                  'K' is kilometers                                      :::
  // :::                  'N' is nautical miles                                  :::
  // :::                                                                         :::
  // :::  Worldwide cities and other features databases with latitude longitude  :::
  // :::  are available at https://www.geodatasource.com                         :::
  // :::                                                                         :::
  // :::  For enquiries, please contact sales@geodatasource.com                  :::
  // :::                                                                         :::
  // :::  Official Web site: https://www.geodatasource.com                       :::
  // :::                                                                         :::
  // :::               GeoDataSource.com (C) All Rights Reserved 2018            :::
  // :::                                                                         :::
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  public getDistance(lat1, lon1, lat2, lon2, unit): string {
    if (lat1 === lat2 && lon1 === lon2) {
      return '0';
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') {
        dist = dist * 1.609344;
      }
      if (unit === 'M') {
        dist = dist * 1.609344 * 1000;
      }
      if (unit === 'N') {
        dist = dist * 0.8684;
      }
      return dist.toFixed(0);
    }
  }
}
