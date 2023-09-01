import { Observable } from 'rxjs';
import { Conseiller } from '../models';
import { ResultFoundPresentation, Searchable } from '../../adresse';

export abstract class ConseillersRepository implements Searchable {
  public abstract getAll$(): Observable<Conseiller[]>;

  public abstract search$(searchTerm: string): Observable<ResultFoundPresentation[]>;
}
