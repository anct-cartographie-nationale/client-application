import { Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-labellisations',
  templateUrl: './labellisations.component.html'
})
export class LabellisationsComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;
}
