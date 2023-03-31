import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { CoordinateursFilterPresentation, DEFAULT_FILTER, PerimetrePresentation } from '../../presenters';
import { invertPerimetreSelection } from './filter.presenter';

type PerimetreControl = PerimetrePresentation[] | null;

type CoordinateursFilterForm = {
  perimetre: FormControl<PerimetreControl>;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent {
  public filterForm: FormGroup<CoordinateursFilterForm> = new FormGroup<CoordinateursFilterForm>({
    perimetre: new FormControl<PerimetreControl>(DEFAULT_FILTER.perimetre)
  });

  @Input() public nombreCoordinateursDepartementaux: number = 0;

  @Input() public nombreCoordinateursBassinDeVie: number = 0;

  @Input() public set filter(filter: CoordinateursFilterPresentation | null) {
    filter && this.filterForm.controls.perimetre.setValue(invertPerimetreSelection(filter.perimetre));
  }

  @Output() public filterChange: EventEmitter<CoordinateursFilterPresentation> =
    new EventEmitter<CoordinateursFilterPresentation>();

  private _isDisplayed: boolean = false;

  private _display$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isDisplayed);
  public display$: Observable<boolean> = this._display$.asObservable();

  public constructor(@Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration) {}

  private show = (): void => {
    this._isDisplayed = true;
    this._display$.next(this._isDisplayed);
  };

  private hide = (): void => {
    this._isDisplayed = false;
    this._display$.next(this._isDisplayed);
  };

  public toggle = (): void => {
    this._isDisplayed ? this.hide() : this.show();
  };

  public onPerimetreChange = (): void => {
    this.filterChange.emit({
      perimetre: invertPerimetreSelection(this.filterForm.value.perimetre ?? [])
    });
  };
}
