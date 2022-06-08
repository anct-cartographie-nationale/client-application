import { Observable, of } from 'rxjs';
import { Structure } from '@gouvfr-anct/mediation-numerique';

export abstract class LieuxMediationNumeriqueRepository {
  public abstract getAll$(): Observable<Structure[]>;
}
