import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, of, merge } from 'rxjs';
import {
  GeolocationPresenter,
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository
} from '../../../../../cartographie/domain';
import { FilterPresenter } from '../../layouts/filter/filter.presenter';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'besoin.page.html'
})
export class BesoinPage {
  // public modalite: string[] = ['Gratuit', 'Payant'];
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

  // public demarche: string[][] = [
  //   ['Accès aux droits', 'Logement', 'Accompagnement CAF', 'Insertion Pro'],
  //   ['Assistance et coups de pouce', 'Autres démarches']
  // ];
  public savoir: string[][] = [
    ['Diagnostic', 'Compétences de base', 'Culture numérique'],
    ['Formation', 'Outils de bureautique', 'Outils créatifs', 'Aide à la parentalité']
  ];
  public equipement: string[][] = [
    ['Wifi', 'Ordinateur', 'Imprimante', 'Scanner'],
    ['Prêt / Don matériel', 'Revues informatiques', 'FabLab']
  ];

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      this.geolocationPresenter.location$,
      this.filterPresenter.filter$
    );

  public constructor(
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly geolocationPresenter: GeolocationPresenter,
    public readonly filterPresenter: FilterPresenter
  ) {}

  public triggerFilter(label: string) {
    this.filterPresenter.filter$.next([...this.filterPresenter.filter$.value, { name: label, type: 'services' }]);
  }
}
