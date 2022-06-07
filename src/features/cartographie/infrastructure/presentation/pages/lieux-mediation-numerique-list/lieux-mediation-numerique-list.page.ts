import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coordinates } from '../../../../domain';
import { StructureService } from '../../../repositories/http';
import {
  GeolocationPresenter,
  GeolocationProvider,
  MarkersPresenter,
  byStructureDistance,
  toStructureWithDistance
} from '../../layouts/cartographie';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  public geolocationProvider: GeolocationProvider = window.navigator.geolocation;

  public structures$: Observable<Structure[]> = combineLatest([
    this.structureService.getStructures(),
    this.geolocationPresenter.location$
  ]).pipe(
    map(([structures, coordinates]: [Structure[], Coordinates]) =>
      structures.map((structures: Structure) => toStructureWithDistance(structures, coordinates)).sort(byStructureDistance)
    )
  );

  public constructor(
    private readonly structureService: StructureService,
    public readonly geolocationPresenter: GeolocationPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public select(lieuMediationId: string) {
    this.markersPresenter.select(lieuMediationId);
    this.router.navigate(['cartographie', lieuMediationId]);
  }
}
