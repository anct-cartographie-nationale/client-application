import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const ANIMATION_DURATION = 300 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html'
})
export class OffcanvasComponent {
  @Input() isAbsolute: boolean = false;

  @Input() useContainer: boolean = true;

  private _isExpanded: boolean = false;

  private _showing$: Subject<boolean> = new Subject<boolean>();
  public showing$: Observable<boolean> = this._showing$.asObservable();

  private _hiding$: Subject<boolean> = new Subject<boolean>();
  public hiding$: Observable<boolean> = this._hiding$.asObservable();

  private _expanded$: Subject<boolean> = new Subject<boolean>();
  public expanded$: Observable<boolean> = this._expanded$.asObservable();

  public toggle(): void {
    this._isExpanded ? this._hiding$.next(true) : this._showing$.next(true);
    this._isExpanded = !this._isExpanded;
    this._expanded$.next(this._isExpanded);

    setTimeout(() => {
      this._showing$.next(false);
      this._hiding$.next(false);
    }, ANIMATION_DURATION);
  }
}
