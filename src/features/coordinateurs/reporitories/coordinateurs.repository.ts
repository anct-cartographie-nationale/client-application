import { Observable } from 'rxjs';
import { Coordinateur } from '../models';

export abstract class CoordinateursRepository {
  public abstract getAll$(): Observable<Coordinateur[]>;
}
