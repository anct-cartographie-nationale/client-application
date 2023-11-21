import { ChangeDetectionStrategy, Component, EventEmitter, Optional, Output } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bandeau-erreur',
  templateUrl: './bandeau-erreur.component.html'
})
export class BandeauErreurComponent {
  @Output() public openErreurFormModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() public closeDetails: EventEmitter<void> = new EventEmitter<void>();
  @Output() public openImpressionChoiceModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor(@Optional() private readonly _matomoTracker?: MatomoTracker) {}

  public onPrintFromBandeauErreur(): void {
    this._matomoTracker?.trackEvent('fiche détail', 'bandeau footer', `impression fiche`);
  }
}
