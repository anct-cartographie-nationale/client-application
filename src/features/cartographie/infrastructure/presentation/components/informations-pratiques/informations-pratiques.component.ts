import { Component, Input } from '@angular/core';
import { LieuMediationNumeriqueDetailsPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-details/lieu-mediation-numerique-details.presentation';

@Component({
  selector: 'app-informations-pratiques',
  templateUrl: './informations-pratiques.component.html'
})
export class InformationsPratiquesComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;
}
