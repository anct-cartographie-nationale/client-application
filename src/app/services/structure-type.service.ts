import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructureType } from '../models/structure-type.model';

@Injectable({
  providedIn: 'root'
})
export class StructureTypeService {
  constructor(private http: HttpClient) {}

  /**
   * Retrive all tcl stop point around given coord
   */
  public getStructureTypes(): Observable<any> {
    return this.http.get<StructureType[]>('/api/structure-type');
  }
}
