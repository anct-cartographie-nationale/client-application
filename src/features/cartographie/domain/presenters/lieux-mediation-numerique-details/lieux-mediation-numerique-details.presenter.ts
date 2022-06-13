import { Structure } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';

const definedStructureOnly = (structure: Structure | undefined): structure is Structure => structure != null;

const toStructureMatchingRouteId = ([structures, params]: [Structure[], { [key: string]: string }]): Structure | undefined =>
  structures.find((structure: Structure) => structure._id === params['id']);

export class LieuxMediationNumeriqueDetailsPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public structureFromParams$(params: Observable<{ [key: string]: string }>): Observable<Structure> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), params]).pipe(
      map(toStructureMatchingRouteId),
      filter(definedStructureOnly)
    );
  }
}
