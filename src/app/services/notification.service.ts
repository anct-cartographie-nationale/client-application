import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public showSuccess(message: string, title: string, timespan: number = 10000): void {
    this.toastr.success(message, title, {
      timeOut: timespan,
    });
  }

  // Par defaut, l'erreur reste affichée jusqu'à ce qu'on clique dessus
  public showError(message: string, title: string, timespan: number = 0): void {
    this.toastr.error(message, title, {
      timeOut: timespan,
      disableTimeOut: timespan ? false : true,
    });
  }

  // Par defaut, l'erreur reste affichée jusqu'à ce qu'on clique dessus
  public showAppNewVersion(): void {
    const update = this.toastr.info(
      'Une nouvelle version est disponible, cliquer ici pour mettre à jour.',
      'Nouvelle version',
      {
        disableTimeOut: true,
      }
    );

    update.onTap.subscribe((action) => {
      window.location.reload();
    });
  }
}
