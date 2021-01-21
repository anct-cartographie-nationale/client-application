import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  public searchAddress(searchQuery: string): Observable<any> {
    return this.http.post<any>(`api/structures/address`, { searchQuery });
  }
}
