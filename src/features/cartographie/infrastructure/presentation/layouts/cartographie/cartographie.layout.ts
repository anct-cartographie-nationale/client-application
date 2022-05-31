import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { delay, Observable } from 'rxjs';
import { StructureService } from '../../../repositories/http';
import { MarkersPresenter } from './markers/markers.presenter';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cartographie.layout.html',
  providers: [MarkersPresenter]
})
export class CartographieLayout {
  public structures$: Observable<Structure[]> = this.structureService.getStructures().pipe(delay(0));

  public constructor(
    private readonly structureService: StructureService,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public showDetailStructure(structure: Structure): void {
    this.router.navigate(['cartographie', structure._id]);
  }
}
