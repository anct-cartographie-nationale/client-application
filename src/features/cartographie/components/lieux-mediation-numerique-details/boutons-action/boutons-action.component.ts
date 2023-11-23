import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public siteWeb: string[] | undefined;

  @Input() public priseRdv: string | undefined;

  @Output() public sendByEmail: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public openImpressionChoiceModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor(@Optional() private readonly _matomoTracker?: MatomoTracker) {}

  public onPrintFromActionButton(): void {
    this._matomoTracker?.trackEvent('fiche détail', 'bouton action', `impression fiche`);
  }
}
