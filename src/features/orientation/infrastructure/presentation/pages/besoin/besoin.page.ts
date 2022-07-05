import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueListPresenter } from '../../../../../cartographie/domain';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { FilterPresenter } from '../../../../domain/presenters/filter/filter.presenter';
import { NO_LOCALISATION } from '../../../../../../models/localisation/localisation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'besoin.page.html'
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

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(NO_LOCALISATION),
      this.filterPresenter.filters$
    );

  public constructor(
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly filterPresenter: FilterPresenter
  ) {}

  public triggerFilter(name: string) {
    this.filterPresenter.setFilter({ name, type: 'services' });
  }
}
