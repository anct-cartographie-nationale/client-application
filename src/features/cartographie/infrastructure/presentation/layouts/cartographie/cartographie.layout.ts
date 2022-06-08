import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { GeolocationPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';

@Component({
  templateUrl: './cartographie.layout.html',
  providers: [GeolocationPresenter, MarkersPresenter]
})
export class CartographieLayout {
  public structures$: Observable<Structure[]> = this.lieuxMediationNumeriqueRepository.getAll$().pipe(delay(0));

  public constructor(
    private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public showDetailStructure(structure: Structure): void {
    this.markersPresenter.select(structure._id);
    this.router.navigate(['cartographie', structure._id]);
  }
}
