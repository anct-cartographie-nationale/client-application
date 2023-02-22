import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedFeatureConfiguration, BRAND_TOKEN, BrandConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-no-lieux-found-modal',
  templateUrl: './no-lieux-found-modal.component.html'
})
export class NoLieuxFoundModalComponent {
  @Input() public cartographieFeature?: ActivatedFeatureConfiguration<boolean>;

  private _isShown: boolean = false;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}

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
  }
}
