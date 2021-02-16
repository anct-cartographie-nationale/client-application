import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TempUser } from '../models/temp-user.model';

@Injectable({
  providedIn: 'root',
})
export class TempUserService {
  private readonly baseUrl = 'api/temp-user';
  constructor(private http: HttpClient) {}

  public getUser(id: string): Observable<TempUser> {
    return this.http.get<TempUser>(`${this.baseUrl}/${id}`);
  }
}
