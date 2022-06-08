import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { StructureService } from '../../../repositories/http';
import { GeolocationPresenter } from './geolocation/geolocation.presenter';
import { MarkersPresenter } from './markers/markers.presenter';

@Component({
  templateUrl: './cartographie.layout.html',
  providers: [GeolocationPresenter, MarkersPresenter]
})
export class CartographieLayout {
  public structures$: Observable<Structure[]> = this.structureService.getStructures().pipe(delay(0));

  public constructor(
    private readonly structureService: StructureService,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public showDetailStructure(structure: Structure): void {
    this.markersPresenter.select(structure._id);
    this.router.navigate(['cartographie', structure._id]);
  }
}
