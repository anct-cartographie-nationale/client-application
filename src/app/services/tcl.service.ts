import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TclStopPoint } from '../models/tclStopPoint.model';

@Injectable({
  providedIn: 'root',
})
export class TclService {
  constructor(private http: HttpClient) {}

  /**
   * Retrive all tcl stop point around given coord
   */
  public getTclStopPointBycoord(longitude: number, latitude: number): Observable<any> {
    return this.http.post<TclStopPoint[]>('/api/tcl/closest', { coordinates: [longitude, latitude] });
  }
}
