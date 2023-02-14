import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LabelNational, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterPresentation } from '../../../../core';
import { OrientationSheetForm } from '../../../models';

@Component({
  animations: [
    trigger('slideRight', [
      transition(':enter', [style({ position: 'absolute', width: '100%', transform: 'translateX(100%)' }), animate(300)]),
      transition(':leave', [animate(300, style({ position: 'absolute', width: '100%', transform: 'translateX(100%)' }))])
    ]),
    trigger('slideLeft', [
      transition(':enter', [style({ position: 'absolute', width: '100%', transform: 'translateX(-100%)' }), animate(300)]),
      transition(':leave', [animate(300, style({ position: 'absolute', width: '100%', transform: 'translateX(-100%)' }))])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-orientation-sheet-modal',
  templateUrl: './orientation-sheet-modal.component.html'
})
export class OrientationSheetModalComponent {
  private _isShown: boolean = false;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  public isReadyToPrint: boolean = false;

  public usager: OrientationSheetForm | undefined;

  public orientationSheetForm = new FormGroup<Record<keyof OrientationSheetForm, AbstractControl>>({
    firstname: new FormControl<OrientationSheetForm['firstname']>('', [Validators.required]),
    lastname: new FormControl<OrientationSheetForm['lastname']>('', [Validators.required]),
    details: new FormControl<OrientationSheetForm['details']>(undefined)
  });

  @Input() public id!: string;
  @Input() public nom!: string;
  @Input() public adresse!: string;
  @Input() public courriel?: string;
  @Input() public telephone?: string;
  @Input() public siteWeb?: string[] = [];
  @Input() public labels_nationaux?: LabelNational[] = [];
  @Input() public localisation?: Localisation;
  @Input() public filters?: FilterPresentation;

  @Output() public print: EventEmitter<OrientationSheetForm> = new EventEmitter<OrientationSheetForm>();

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

  public onSubmitOrientationSheetForm() {
    if (this.orientationSheetForm.invalid) {
      this.orientationSheetForm.markAllAsTouched();
      return;
    }

    this.isReadyToPrint = true;
    this.usager = this.orientationSheetForm.getRawValue();
  }

  public displayOrientationSheetForm() {
    this.isReadyToPrint = false;
  }

  public close(): void {
    this.toggle();
    this.orientationSheetForm.reset();
    this.isReadyToPrint = false;
  }
}
