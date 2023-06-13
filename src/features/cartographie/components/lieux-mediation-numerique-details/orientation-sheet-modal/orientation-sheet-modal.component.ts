import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LabelNational, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../../root';
import { FilterPresentation } from '../../../../core/presenters';
import { OrientationSheetForm, PrescripteurOrientationSheetForm, UsagerOrientationSheetForm } from '../../../models';

@Component({
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

  public printOrientationSheetStep: 'usager' | 'prescripteur' | 'résumé' = 'usager';

  public usager: UsagerOrientationSheetForm | undefined;
  public prescripteur: PrescripteurOrientationSheetForm | undefined;

  public usagerOrientationSheetForm = new FormGroup<Record<keyof UsagerOrientationSheetForm, AbstractControl>>({
    firstname: new FormControl<UsagerOrientationSheetForm['firstname']>('', [Validators.required]),
    lastname: new FormControl<UsagerOrientationSheetForm['lastname']>('', [Validators.required]),
    details: new FormControl<UsagerOrientationSheetForm['details']>(undefined)
  });

  public prescripteurOrientationSheetForm = new FormGroup<Record<keyof PrescripteurOrientationSheetForm, AbstractControl>>({
    firstname: new FormControl<PrescripteurOrientationSheetForm['firstname']>('', [Validators.required]),
    lastname: new FormControl<PrescripteurOrientationSheetForm['lastname']>('', [Validators.required]),
    place: new FormControl<PrescripteurOrientationSheetForm['place']>('', [Validators.required])
  });

  @Input() public id!: string;
  @Input() public nom!: string;
  @Input() public adresse!: string;
  @Input() public courriel: string | undefined;
  @Input() public telephone?: string;
  @Input() public siteWeb: string[] | undefined = [];
  @Input() public labels_nationaux: LabelNational[] | undefined = [];
  @Input() public localisation: Localisation | undefined;
  @Input() public filters?: FilterPresentation;

  @Output() public print: EventEmitter<OrientationSheetForm> = new EventEmitter<OrientationSheetForm>();

  public constructor(@Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration) {}

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

  public onSubmitUsagerOrientationSheetForm() {
    if (this.usagerOrientationSheetForm.invalid) {
      this.usagerOrientationSheetForm.markAllAsTouched();
      return;
    }

    this.printOrientationSheetStep = 'prescripteur';
    this.usager = this.usagerOrientationSheetForm.getRawValue();
  }

  public onSubmitPrescripteurOrientationSheetForm(): void {
    if (this.prescripteurOrientationSheetForm.invalid) {
      this.prescripteurOrientationSheetForm.markAllAsTouched();
      return;
    }

    this.printOrientationSheetStep = 'résumé';
    this.prescripteur = this.prescripteurOrientationSheetForm.getRawValue();
  }

  public close(): void {
    this.toggle();
    this.usagerOrientationSheetForm.reset();
    this.printOrientationSheetStep = 'usager';
  }

  public printWithOrientationSheetDetails(): void {
    this.print.emit({
      usager: this.usagerOrientationSheetForm.getRawValue(),
      prescripteur: this.prescripteurOrientationSheetForm.getRawValue()
    });
  }
}
