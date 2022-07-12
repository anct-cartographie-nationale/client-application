import { Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-types-accompagnement',
  templateUrl: './types-accompagnement.component.html'
})
export class TypesAccompagnementComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  public typesAccompagnement: Array<{ title: string; icon: string; description: string }> = [
    { title: 'seul', icon: 'ri-user-3-line', description: "j'ai accès à du materiel et une connexion" },
    { title: "avec de l'aide", icon: 'ri-group-line', description: "je suis accompagné dans l'usage du numérique" },
    { title: 'dans un atelier', icon: 'ri-tools-line', description: "j'apprends à utiliser le numérique" },
    { title: 'à ma place', icon: 'ri-service-line', description: 'une personne fait les démarches à ma place' }
  ];
}
