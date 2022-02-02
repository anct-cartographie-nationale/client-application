import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private readonly baseUrl = 'api/pages/';
  constructor(private http: HttpClient, private router: Router) {}

  public getPage(slugPage: string): Observable<Page> {
    return this.http.get<Page>(`${this.baseUrl}` + slugPage).pipe(
      map((item: Page) => {
        return new Page(item);
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return new Observable<Page>();
      })
    );
  }
}
