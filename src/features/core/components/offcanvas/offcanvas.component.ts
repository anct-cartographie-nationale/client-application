import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const ANIMATION_DURATION: 300 = 300 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offcanvas[heading]',
  templateUrl: './offcanvas.component.html'
})
export class OffcanvasComponent implements OnChanges {
  @Input() public isAbsolute: boolean = false;

  @Input() public useContainer: boolean = true;

  @Input() public useHeader: boolean = true;

  @Input() public useCloseButton: boolean = true;

  @Input() public heading!: string;

  public id: string = '';

  private _isExpanded: boolean = false;

  private _showing$: Subject<boolean> = new Subject<boolean>();
  public showing$: Observable<boolean> = this._showing$.asObservable();

  private _hiding$: Subject<boolean> = new Subject<boolean>();
  public hiding$: Observable<boolean> = this._hiding$.asObservable();

  private _expanded$: Subject<boolean> = new Subject<boolean>();
  public expanded$: Observable<boolean> = this._expanded$.asObservable();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['heading'].firstChange) this.id = this.heading.toLowerCase().replace(/\s/gu, '-');
  }

  public toggle(): void {
    this._isExpanded ? this._hiding$.next(true) : this._showing$.next(true);
    this._isExpanded = !this._isExpanded;
    this._isExpanded && this._expanded$.next(this._isExpanded);

    setTimeout((): void => {
      !this._isExpanded && this._expanded$.next(this._isExpanded);
      this._showing$.next(false);
      this._hiding$.next(false);
    }, ANIMATION_DURATION);
  }

  public close(): void {
    if (!this._isExpanded) return;
    this._isExpanded = false;
    this._expanded$.next(false);
  }
}
