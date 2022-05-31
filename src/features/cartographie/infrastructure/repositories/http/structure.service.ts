import { Injectable } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Observable, of } from 'rxjs';
import structures from '../static/structures.json';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  public getStructure(id: string): Observable<Structure> {
    return of(new Structure());
  }

  public getStructures(): Observable<Structure[]> {
    return of(structures.map((structure) => new Structure(structure)));
  }

  public sendMailOnStructureError(structureId: string, content: string): Observable<any> {
    return of(null);
  }
}
