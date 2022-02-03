import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  // Ref: https://angular.io/api/service-worker/SwUpdate
  // Ref: https://alligator.io/angular/service-worker-updates/
  constructor(private swUpdate: SwUpdate, private notificationService: NotificationService) {}

  subscribeUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.showUpdateToast();
      });
    }
  }

  private async showUpdateToast() {
    this.notificationService.showAppNewVersion();
  }
}
