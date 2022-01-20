import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactMessage } from '../models/contact-message.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  public sendMessage(contactMessage: ContactMessage): Observable<any> {
    return this.http.post('/api/contact/message', { contactMessage });
  }
}
