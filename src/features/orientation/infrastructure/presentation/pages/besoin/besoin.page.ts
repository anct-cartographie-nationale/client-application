import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './besoin.page.html'
})
export class BesoinPage {
  public demarche: string[] = ['Etre accompagné dans les démarches administratives', 'Créer et développer mon entreprise'];

  public niveau: string[] = [
    'Prendre en main un smartphone ou une tablette',
    'Utiliser le numérique au quotidien',
    'Gagner en autonomie dans les démarches administratives',
    'Approfondir ma culture numérique',
    'Favoriser mon insertion professionnelle',
    'Prendre en main un ordinateur'
  ];

  public manqueDeMateriel: string[] = ['Accéder à une connexion internet', 'Accéder à du matériel'];

  public constructor(public readonly orientationLayout: OrientationLayout) {}
}
