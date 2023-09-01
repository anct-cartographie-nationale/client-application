import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

const ANIMATION_DURATION: 300 = 300 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-offcanvas[heading]',
  templateUrl: './offcanvas.component.html'
})
export class OffcanvasComponent implements OnChanges {
  @Input() public isAbsolute: boolean = false;

  @Input() public useHeader: boolean = true;

  @Input() public useCloseButton: boolean = true;

  @Input() public className: string = '';

  @Input() public heading!: string;

  @ViewChild('dialog', { read: ElementRef }) public dialog!: ElementRef<HTMLElement>;

  public id: string = '';

  private _isExpanded: boolean = false;

  private _showing$: Subject<boolean> = new Subject<boolean>();
  public showing$: Observable<boolean> = this._showing$.asObservable();

  private _hiding$: Subject<boolean> = new Subject<boolean>();
  public hiding$: Observable<boolean> = this._hiding$.asObservable();

  private _expanded$: Subject<boolean> = new Subject<boolean>();
  public expanded$: Observable<boolean> = this._expanded$.asObservable();

  private _invokingContext?: HTMLElement;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['heading'].firstChange) this.id = this.heading.toLowerCase().replace(/\s/gu, '-');
  }

  private show(): void {
    this._showing$.next(true);
    this._expanded$.next(true);
    setTimeout((): void => {
      this._showing$.next(false);
      this.dialog.nativeElement.focus();
    }, ANIMATION_DURATION);
  }

  @HostListener('keyup.escape')
  private hide(): void {
    this._hiding$.next(true);
    this._invokingContext?.focus();
    setTimeout((): void => {
      this._expanded$.next(false);
      this._hiding$.next(false);
    }, ANIMATION_DURATION);
  }

  public toggle(event: MouseEvent): void {
    this._invokingContext = event.target as HTMLElement;
    this._isExpanded ? this.hide() : this.show();
    this._isExpanded = !this._isExpanded;
  }

  public close(): void {
    if (!this._isExpanded) return;
    this._isExpanded = false;
    this._expanded$.next(false);
  }
}
