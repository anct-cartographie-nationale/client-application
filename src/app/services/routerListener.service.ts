import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterListenerService {
  private previousUrl: string;
  constructor(private router: Router) {}

  /**
   * Start recording navigation history
   */
  public loadRouting(): void {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }

  public goToPreviousUrl(data?: any): void {
    if (data) {
      this.router.navigateByUrl(this.previousUrl, { state: { data: data } });
    } else {
      this.router.navigateByUrl(this.previousUrl);
    }
  }
}
