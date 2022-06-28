import { combineLatest, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

const definedStructureOnly = (
  LieuMediationNumerique: LieuMediationNumerique | undefined
): LieuMediationNumerique is LieuMediationNumerique => LieuMediationNumerique != null;

const toStructureMatchingRouteId = ([LieuMediationNumerique, params]: [LieuMediationNumerique[], { [key: string]: string }]):
  | LieuMediationNumerique
  | undefined =>
  LieuMediationNumerique.find((LieuMediationNumerique: LieuMediationNumerique) => LieuMediationNumerique.id === params['id']);

export class LieuxMediationNumeriqueDetailsPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public structureFromParams$(params: Observable<{ [key: string]: string }>): Observable<LieuMediationNumerique> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), params]).pipe(
      map(toStructureMatchingRouteId),
      filter(definedStructureOnly)
    );
  }
}
