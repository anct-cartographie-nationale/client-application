import { BehaviorSubject, Observable } from 'rxjs';

export class MarkersPresenter {
  private _highlighted$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _selected$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public highlighted$: Observable<string> = this._highlighted$.asObservable();
  public selected$: Observable<string> = this._selected$.asObservable();

  public highlight(markerId: string) {
    this._highlighted$.next(markerId);
    this._selected$.next('');
  }

  public select(markerId: string) {
    this._selected$.next(markerId);
  }
}
