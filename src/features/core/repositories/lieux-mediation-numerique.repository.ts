import { Observable } from 'rxjs';
import { LieuMediationNumerique } from '../models';

export abstract class LieuxMediationNumeriqueRepository {
  public abstract getAll$(): Observable<LieuMediationNumerique[]>;
}
