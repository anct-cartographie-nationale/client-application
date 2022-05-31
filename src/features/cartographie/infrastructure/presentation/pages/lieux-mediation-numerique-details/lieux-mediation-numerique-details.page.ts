import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, filter, Observable } from 'rxjs';
import { StructureService } from '../../../repositories/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: 'lieux-mediation-numerique-details.page.html'
})
export class LieuxMediationNumeriqueDetailsPage {
  public structure$: Observable<Structure> = combineLatest([this.structureService.getStructures(), this.route.params]).pipe(
    map(([structures, params]: [Structure[], Params]): Structure | undefined => {
      return structures.find((structure: Structure) => structure._id === params['id']);
    }),
    filter((structure: Structure | undefined): structure is Structure => structure !== null)
  );

  public constructor(private readonly structureService: StructureService, private readonly route: ActivatedRoute) {}
}
