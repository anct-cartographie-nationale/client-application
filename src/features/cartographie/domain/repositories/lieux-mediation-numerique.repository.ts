import { Observable, of } from 'rxjs';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { LieuMediationNumerique } from '../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

export abstract class LieuxMediationNumeriqueRepository {
  public abstract getAll$(): Observable<LieuMediationNumerique[]>;
}
