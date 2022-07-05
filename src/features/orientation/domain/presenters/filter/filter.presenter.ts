import { BehaviorSubject, Observable, of } from 'rxjs';

export type FilterPresentation = { name: string; type: string };

export class FilterPresenter {
  private _filters$: BehaviorSubject<FilterPresentation[]> = new BehaviorSubject<FilterPresentation[]>([]);

  public filters$: Observable<FilterPresentation[]> = this._filters$.asObservable();

  public setFilter(filter: FilterPresentation) {
    this._filters$.next([...this._filters$.value, filter]);
  }
}
