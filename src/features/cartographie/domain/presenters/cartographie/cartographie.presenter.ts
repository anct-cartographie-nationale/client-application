import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { toStructuresPresentation } from '../../../infrastructure/presentation/models/structure';

export class CartographiePresenter {
  public constructor(public readonly lieuMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public getStructures$(): Observable<Structure[]> {
    return this.lieuMediationNumeriqueRepository
      .getAll$()
      .pipe(map((lieuxMediationNumerique: LieuMediationNumerique[]) => toStructuresPresentation(lieuxMediationNumerique)));
  }
}
