import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  selector: 'app-mediation-numerique-details-item',
  templateUrl: './lieu-mediation-numerique-details-item.component.html'
})
export class LieuMediationNumeriqueDetailsItemComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  public constructor(private readonly router: Router) {}

  public navigateList() {
    this.router.navigate(['cartographie']);
  }

  public printPage() {
    window.print();
  }

  public splitArrayTypes = <T extends string>(stringType: T[]) => stringType[0].split(',');

  public typesAccompagnement: Array<{ title: string; icon: string; description: string }> = [
    { title: 'seul', icon: 'ri-user-3-line', description: "j'ai accès à du materiel et une connexion" },
    { title: "avec de l'aide", icon: 'ri-group-line', description: "je suis accompagné dans l'usage du numérique" },
    { title: 'dans un atelier', icon: 'ri-tools-line', description: "j'apprends à utiliser le numérique" },
    { title: 'à ma place', icon: 'ri-service-line', description: 'une personne fait les démarches à ma place' }
  ];

  public labelsNationaux: Array<{ title: string; icon: string }> = [
    { title: 'France Services', icon: 'assets/labels-nationaux/maisonFranceService.svg' },
    { title: 'APTIC', icon: 'assets/labels-nationaux/aptic.svg' },
    { title: 'Aidants Connect', icon: 'assets/labels-nationaux/aidantsConnect.svg' },
    { title: 'Fabriques de Territoire', icon: 'assets/labels-nationaux/fabriqueDeTerritoire.svg' },
    { title: 'Grandes écoles du numérique', icon: 'assets/labels-nationaux/gandeEcoleDuNumerique.svg' },
    { title: 'Point relais CAF', icon: 'assets/labels-nationaux/pointRelaisCaf.svg' },
    { title: 'Relais pôle emploi', icon: 'assets/labels-nationaux/poleEmploi.svg' },
    { title: 'French Tech', icon: 'assets/labels-nationaux/laFrenchTech.svg' },
    { title: 'Campus connecté', icon: 'assets/labels-nationaux/campusConnecte.svg' }
  ];
}
