import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Localisation } from '../../../../../models/localisation/localisation';

export interface CenterView {
  coordinates: Localisation;
  zoomLevel: number;
}

export class MarkersPresenter {
  private readonly _centerView$: Subject<CenterView> = new Subject<CenterView>();
  private readonly _highlighted$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _selected$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public readonly centerView$: Observable<CenterView> = this._centerView$.asObservable();
  public readonly highlighted$: Observable<string> = this._highlighted$.asObservable();
  public readonly selected$: Observable<string> = this._selected$.asObservable();

  public highlight(markerId: string) {
    this._highlighted$.next(markerId);
    this._selected$.next('');
  }

  public select(markerId: string) {
    this._selected$.next(markerId);
  }

  public focus(coordinates: Localisation, zoomLevel: number) {
    this._centerView$.next({ coordinates, zoomLevel });
  }
}
