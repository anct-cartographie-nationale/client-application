import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  public constructor(private readonly router: Router) {}

  public navigateList() {
    this.router.navigate(['cartographie']);
  }
}
