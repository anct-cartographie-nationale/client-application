import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ConseillerDetailsPresentation,
  CoordinateurDetailsPresentation
} from '../../pages/coordinateur-details/coordinateur-details.presentation';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conseiller-details-modal',
  templateUrl: './conseiller-details-modal.component.html'
})
export class ConseillerDetailsModalComponent {
  @Input() coordinateur?: CoordinateurDetailsPresentation;
  @Input() conseiller?: ConseillerDetailsPresentation;

  private _isShown: boolean = false;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}

  private show(): void {
    this._activateModal$.next(true);
    setTimeout(() => this._animate$.next(true), 100);
  }

  private hide(): void {
    this._animate$.next(false);
    setTimeout(() => this._activateModal$.next(false), 300);
  }

  public toggle(): void {
    this._isShown ? this.hide() : this.show();
    this._isShown = !this._isShown;
  }

  public close(): void {
    this.toggle();
  }
}
