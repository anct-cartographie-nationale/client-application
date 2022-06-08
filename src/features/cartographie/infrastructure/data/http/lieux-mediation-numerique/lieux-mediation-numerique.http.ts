import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../../../domain';
import structures from '../../../services/assets/structures.json';

export class LieuxMediationNumeriqueHttp extends LieuxMediationNumeriqueRepository {
  public getAll$(): Observable<Structure[]> {
    return of(structures.map((structure) => new Structure(structure)));
  }
}
