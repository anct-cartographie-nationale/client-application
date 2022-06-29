import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GeolocationPresenter, LieuxMediationNumeriqueListPresenter } from '../../../../../cartographie/domain';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Injectable({
  providedIn: 'root'
})
export class FilterPresenter {
  public filter$: BehaviorSubject<{ name: string; type: string }[]> = new BehaviorSubject<{ name: string; type: string }[]>([]);

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      this.geolocationPresenter.location$,
      this.filter$
    );
  public constructor(
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly geolocationPresenter: GeolocationPresenter
  ) {}
}
