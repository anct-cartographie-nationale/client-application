import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type Background = 'light' | 'primary' | 'white';

const ANIMATION_DURATION: 300 = 300 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modal[heading]',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() public closeLabel?: string;

  @Input() public heading!: string;

  @Input() public icon?: string;

  @Input() public bgFooter: Background = 'light';

  @Input() public bgBody: Background = 'white';

  @Input() public bgTitle: Background = 'primary';

  @Input() public customHeading?: TemplateRef<any>;

  @Output() public closed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('dialog', { read: ElementRef }) public dialog!: ElementRef<HTMLElement>;

  public id: string = '';

  private _invokingContext?: HTMLElement;

  private _isShown: boolean = false;

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private unlistenTabKey?: () => void;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['heading']?.firstChange) this.id = this.heading.toLowerCase().replace(/\s/gu, '-');
  }

  public constructor(private renderer: Renderer2) {}

  public trapTabKey(event: KeyboardEvent): void {
    event.key === 'Tab' && event.shiftKey ? this.shiftTabKey() : this.tabKey();
  }

  public ngAfterViewInit(): void {
    this.unlistenTabKey = this.renderer.listen('document', 'keydown', this.trapTabKey.bind(this));
  }

  public ngOnDestroy(): void {
    this.unlistenTabKey && this.unlistenTabKey();
  }

  private show(): void {
    this._activateModal$.next(true);
    setTimeout((): void => {
      this.dialog.nativeElement.focus();
      this._animate$.next(true);
    }, ANIMATION_DURATION);
  }

  private hide(): void {
    this._animate$.next(false);
    setTimeout((): void => this._activateModal$.next(false), ANIMATION_DURATION);
  }

  public toggle(event: MouseEvent): void {
    this._invokingContext = event.target as HTMLElement;
    this._isShown ? this.hide() : this.show();
    this._isShown = !this._isShown;
  }

  private isFocusOutOfModal(): boolean {
    return !this.dialog.nativeElement.contains(document.activeElement);
  }

  private focusableElements(): NodeListOf<Element> {
    return this.dialog.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  private firstFocusableElement(): HTMLElement {
    return this.focusableElements()[0] as HTMLElement;
  }

  private lastFocusableElement(): HTMLElement {
    const focusableElements: NodeListOf<Element> = this.focusableElements();
    return focusableElements[focusableElements.length - 1] as HTMLElement;
  }

  @HostListener('keydown.tab')
  public tabKey(): void {
    this._isShown && requestAnimationFrame(() => this.isFocusOutOfModal() && this.firstFocusableElement().focus());
  }

  @HostListener('keydown.shift.tab')
  public shiftTabKey(): void {
    this._isShown && requestAnimationFrame(() => this.isFocusOutOfModal() && this.lastFocusableElement().focus());
  }

  @HostListener('keyup.escape')
  public close(): void {
    this.hide();
    this._isShown = false;
    this.closed.emit();
    requestAnimationFrame(() => this._invokingContext?.focus());
  }
}
