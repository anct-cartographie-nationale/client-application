import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  GeolocationPresenter,
  GeolocationProvider,
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository,
  MarkersPresenter
} from '../../../../domain';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ],
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  public geolocationProvider: GeolocationProvider = window.navigator.geolocation;

  public structures$: Observable<Structure[]> = this.lieuxMediationNumeriqueListPresenter.structuresByDistance$(
    this.geolocationPresenter.location$
  );

  public constructor(
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly geolocationPresenter: GeolocationPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public select(lieuMediationId: string) {
    this.markersPresenter.select(lieuMediationId);
    this.router.navigate(['cartographie', lieuMediationId]);
  }
}
