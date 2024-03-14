import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { SourcePresentation } from '@features/cartographie/presenters';
import { MatomoTracker } from 'ngx-matomo';
import { environment } from 'projects/client-application/src/environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public siteWeb: string[] | undefined;

  @Input() public priseRdv: string | undefined;

  @Input() public sources: SourcePresentation[] | undefined;

  @Output() public sendByEmail: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() public openImpressionChoiceModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor(@Optional() private readonly _matomoTracker?: MatomoTracker) {}

  public onPrintFromActionButton(): void {
    if (environment.production) {
      const sourceLabels = this.sources?.map((source) => source.label).join(', ');
      this._matomoTracker?.trackEvent('fiche détail', sourceLabels ?? 'Source inconnue', `bouton action - impression fiche`);
    }
  }

  public onSendEmailFromActionButton(): void {
    if (environment.production) {
      const sourceLabels = this.sources?.map((source) => source.label).join(', ');
      this._matomoTracker?.trackEvent('fiche détail', sourceLabels ?? 'Source inconnue', `bouton action - envoyer par email`);
    }
  }
}
