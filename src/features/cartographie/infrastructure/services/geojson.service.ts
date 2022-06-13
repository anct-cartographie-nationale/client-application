import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoJson } from '@gouvfr-anct/mediation-numerique';
import { delay, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import wfsGrandLyon from './assets/wfs-grandlyon.json';

@Injectable()
export class GeojsonService {
  constructor(private http: HttpClient) {}

  public getMDMGeoJson(): Observable<GeoJson[]> {
    return of(wfsGrandLyon).pipe(
      delay(0),
      map((data: any) => _.map(data.features, (data: string): GeoJson => new GeoJson(data)))
    );
  }

  public getTownshipCoord(town: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(`/api/structures/coordinates/` + town);
  }
}
