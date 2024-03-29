import { Observable } from 'rxjs';
import { LieuMediationNumeriqueWithAidants } from '../models';

export abstract class LieuxMediationNumeriqueRepository {
  public abstract getAll$(): Observable<LieuMediationNumeriqueWithAidants[]>;
}
