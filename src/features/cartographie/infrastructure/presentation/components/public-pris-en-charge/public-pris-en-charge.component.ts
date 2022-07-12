import { Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-public-pris-en-charge',
  templateUrl: './public-pris-en-charge.component.html'
})
export class PublicPrisEnChargeComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;
}
