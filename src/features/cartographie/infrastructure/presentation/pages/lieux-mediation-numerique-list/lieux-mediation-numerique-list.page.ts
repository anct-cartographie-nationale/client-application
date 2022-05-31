import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coordinates } from '../../../../domain';
import { StructureService } from '../../../repositories/http';
import { MarkersPresenter, byStructureDistance, toStructureWithDistance } from '../../layouts/cartographie';
import { GeolocationPresenter, GeolocationProvider } from './geolocation/geolocation.presenter';

@Component({
  templateUrl: 'lieux-mediation-numerique-list.page.html',
  providers: [GeolocationPresenter]
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

  public currentStructure: Structure = new Structure();

  public constructor(
    private readonly structureService: StructureService,
    public readonly geolocationPresenter: GeolocationPresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}
