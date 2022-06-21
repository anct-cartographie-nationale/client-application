import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'besoin.page.html'
})
export class BesoinPage {
  public demarche: string[][] = [
    ['Accès aux droits', 'Logement', 'Accompagnement CAF', 'Insertion Pro'],
    ['Assistance et coups de pouce', 'Autres démarches']
  ];
  public savoir: string[][] = [
    ['Diagnostic', 'Compétences de base', 'Culture numérique'],
    ['Formation', 'Outils de bureautique', 'Outils créatifs', 'Aide à la parentalité']
  ];
  public equipement: string[][] = [
    ['Wifi', 'Ordinateur', 'Imprimante', 'Scanner'],
    ['Prêt / Don matériel', 'Revues informatiques', 'FabLab']
  ];
}
