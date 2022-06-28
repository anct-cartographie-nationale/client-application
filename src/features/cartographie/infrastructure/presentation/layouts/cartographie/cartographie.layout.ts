import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { GeolocationPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';
import { CartographiePresenter } from '../../../../domain/presenters/cartographie/cartographie.presenter';

@Component({
  templateUrl: './cartographie.layout.html',
  providers: [
    GeolocationPresenter,
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: CartographiePresenter,
      useClass: CartographiePresenter
    },
    MarkersPresenter
  ]
})
export class CartographieLayout {
  public structures$: Observable<Structure[]> = this.cartographiePresenter.getStructures$().pipe(delay(0));

  public constructor(
    private readonly cartographiePresenter: CartographiePresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public showDetailStructure(structure: Structure): void {
    this.markersPresenter.select(structure._id);
    this.router.navigate(['cartographie', structure._id]);
  }
}
