import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalOffer } from '../models/personalOffer.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalOfferService {
  constructor(private http: HttpClient) {}

  public createPersonalOffer(structureId: string, personalOffer: PersonalOffer): Observable<any> {
    return this.http.post<any>(`api/personal-offers/`, { structureId: structureId, personalOffer: personalOffer });
  }
}
