import { Observable } from 'rxjs';
import { Conseiller } from '../models';

export abstract class ConseillersRepository {
  public abstract getAll$(): Observable<Conseiller[]>;
}
