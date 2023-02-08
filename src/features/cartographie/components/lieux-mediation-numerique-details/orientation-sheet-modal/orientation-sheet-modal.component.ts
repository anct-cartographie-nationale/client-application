import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { LabelNational, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

type OrientationSheetForm = {
  firstname: string;
  lastname: string;
  details?: string;
};

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
  private _isOrientationSheetModalShown: boolean = false;

  private _activateOrientationSheetModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this._isOrientationSheetModalShown
  );
  public activateOrientationSheetModal$: Observable<boolean> = this._activateOrientationSheetModal$.asObservable();

  private _animateOrientationSheetModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this._isOrientationSheetModalShown
  );
  public animateOrientationSheetModal$: Observable<boolean> = this._animateOrientationSheetModal$;

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

  private showOrientationSheetModal() {
    this._activateOrientationSheetModal$.next(true);
    setTimeout(() => this._animateOrientationSheetModal$.next(true), 100);
  }

  private hideOrientationSheetModal() {
    this._animateOrientationSheetModal$.next(false);
    setTimeout(() => this._activateOrientationSheetModal$.next(false), 300);
  }

  public toggleOrientationSheetModal() {
    this._isOrientationSheetModalShown ? this.hideOrientationSheetModal() : this.showOrientationSheetModal();
    this._isOrientationSheetModalShown = !this._isOrientationSheetModalShown;
  }

  public onSubmitOrientationSheetForm() {
    if (this.orientationSheetForm.invalid) {
      this.orientationSheetForm.markAllAsTouched();
      return;
    }

    this.isReadyToPrint = true;
    this.usager = this.orientationSheetForm.getRawValue();
    console.log('onSubmitOrientationSheetForm');
  }

  public displayOrientationSheetForm() {
    this.isReadyToPrint = false;
  }

  public close(): void {
    this.toggleOrientationSheetModal();
    this.orientationSheetForm.reset();
    this.isReadyToPrint = false;
  }
}
