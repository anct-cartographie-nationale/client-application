import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private http: HttpClient) {}

  public newsletterSubscribe(email: string): Observable<any> {
    return this.http.post('/api/newsletter/subscribe', {email});
  }

  public newsletterUnsubscribe(email: string): Observable<any> {
    return this.http.post('/api/newsletter/unsubscribe', {email});
  }
}
