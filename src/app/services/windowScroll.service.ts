import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService {
  scrollY = new BehaviorSubject(null);
  scrollY$ = this.scrollY.asObservable();

  constructor() {}

  public updateScrollY(value: Event): void {
    this.scrollY.next(value);
  }
}
