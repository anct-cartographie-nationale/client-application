import { Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-modalites-accompagnement',
  templateUrl: './modalites-accompagnement.component.html'
})
export class ModalitesAccompagnementComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  public modalitesAccompagnement: Array<{ title: string; icon: string; description: string }> = [
    { title: 'Seul', icon: 'ri-user-3-line', description: "j'ai accès à du materiel et une connexion" },
    { title: "Avec de l'aide", icon: 'ri-group-line', description: "je suis accompagné dans l'usage du numérique" },
    { title: 'Dans un atelier', icon: 'ri-tools-line', description: "j'apprends à utiliser le numérique" },
    { title: 'A ma place', icon: 'ri-service-line', description: 'une personne fait les démarches à ma place' }
  ];
}
