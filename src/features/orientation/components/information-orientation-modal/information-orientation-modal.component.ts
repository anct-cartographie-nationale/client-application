import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationInformationContent } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-orientation-modal',
  templateUrl: './information-orientation-modal.component.html'
})
export class InformationOrientationModalComponent {
  @Input() public validationValue: Service | null = null;

  @Input() public orientationInformation: OrientationInformationContent | null = null;

  @Output() public validateChange: EventEmitter<Service> = new EventEmitter<Service>();

  @Output() public hideChange: EventEmitter<void> = new EventEmitter<void>();

  private _isShown: boolean = false;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  private show(): void {
    this._activateModal$.next(true);
    setTimeout(() => this._animate$.next(true), 100);
  }

  private hide(): void {
    this._animate$.next(false);
    setTimeout(() => {
      this.hideChange.emit();
      this._activateModal$.next(false);
    }, 300);
  }

  public toggle(): void {
    this._isShown ? this.hide() : this.show();
    this._isShown = !this._isShown;
  }

  public close(): void {
    this.toggle();
  }
}
