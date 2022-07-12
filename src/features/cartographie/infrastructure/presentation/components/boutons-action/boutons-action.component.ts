import { Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html'
})
export class BoutonsActionComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  public printPage() {
    window.print();
  }
}
