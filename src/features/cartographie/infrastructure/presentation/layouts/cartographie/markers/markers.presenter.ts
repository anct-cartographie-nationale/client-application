import { BehaviorSubject, Observable } from 'rxjs';

export class MarkersPresenter {
  private _focused$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _highlighted$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public focused$: Observable<string> = this._focused$.asObservable();
  public highlighted$: Observable<string> = this._highlighted$.asObservable();

  public focus(markerId: string) {
    this._focused$.next(markerId);
  }

  public highlight(markerId: string) {
    this._highlighted$.next(markerId);
  }
}
