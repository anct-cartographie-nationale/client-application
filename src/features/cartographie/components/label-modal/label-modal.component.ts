import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { LabelPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-label-modal[label]',
  templateUrl: './label-modal.component.html'
})
export class LabelModalComponent {
  private _isShown: boolean = false;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  public isReadyToPrint: boolean = false;

  @Input() public label: LabelPresentation | null = null;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}

  private show() {
    this._activateModal$.next(true);
    setTimeout(() => this._animate$.next(true), 100);
  }

  private hide() {
    this._animate$.next(false);
    setTimeout(() => this._activateModal$.next(false), 300);
  }

  public toggle() {
    this._isShown ? this.hide() : this.show();
    this._isShown = !this._isShown;
  }

  public close(): void {
    this.toggle();
    this.isReadyToPrint = false;
  }
}
