import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { OpeningHours } from '../../../core/presenters';
import { openingHoursValidator } from './opening-hours.validator';

type OpeningHoursControls = Record<keyof OpeningHours, FormControl<OpeningHours[keyof OpeningHours] | null>>;

const DEFAULT_OPENING_HOURS: OpeningHours = {
  day: '',
  period: '',
  start: undefined,
  end: undefined
};

const openingHoursFormControl = (openingHours: OpeningHours = DEFAULT_OPENING_HOURS): FormGroup<OpeningHoursControls> =>
  new FormGroup<OpeningHoursControls>(
    {
      day: new FormControl<OpeningHours['day']>(openingHours.day),
      period: new FormControl<OpeningHours['period']>(openingHours.period || 'hours'),
      start: new FormControl<OpeningHours['start']>(openingHours.start),
      end: new FormControl<OpeningHours['end']>(openingHours.end)
    },
    [openingHoursValidator]
  );

const exceptGroupAt =
  (removeIndex: number) =>
  (_: FormGroup<OpeningHoursControls>, index: number): boolean =>
    removeIndex !== index;

const onlyValidControl = (openingHoursFormControl: FormGroup<OpeningHoursControls>): boolean => openingHoursFormControl.valid;

const fromControlToOpeningHoursFields = (openingHoursFormControl: AbstractControl): OpeningHours => ({
  day: openingHoursFormControl.value?.day,
  ...(openingHoursFormControl.value?.period ? { period: openingHoursFormControl.value.period } : {}),
  ...(openingHoursFormControl.value?.start ? { start: openingHoursFormControl.value.start } : {}),
  ...(openingHoursFormControl.value?.end ? { end: openingHoursFormControl.value.end } : {})
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-opening-hours-form',
  templateUrl: 'opening-hours-form.component.html'
})
export class OpeningHoursFormComponent {
  @Input() set openingHours(openingHours: OpeningHours[]) {
    if (this.openingHoursForm.controls.length > 1) return;

    this.openingHoursForm = new FormArray<FormGroup<OpeningHoursControls>>(
      (openingHours ?? []).map((openingHours: OpeningHours) =>
        openingHoursFormControl({ ...DEFAULT_OPENING_HOURS, ...openingHours })
      )
    );
    this.openingHoursForm.controls.push(openingHoursFormControl());
  }

  @Output() selectOpeningHours: EventEmitter<OpeningHours[]> = new EventEmitter<OpeningHours[]>();

  public openingHoursForm: FormArray<FormGroup<OpeningHoursControls>> = new FormArray<FormGroup<OpeningHoursControls>>([
    openingHoursFormControl()
  ]);

  private isValidOpeningHoursGroupAt = (index: number): boolean => this.openingHoursForm.controls.at(index)?.valid ?? false;

  private isLastOpeningHoursGroup = (index: number): boolean => index === this.openingHoursForm.length - 1;

  private appendOpeningHoursFieldFor = (index: number): boolean =>
    this.isLastOpeningHoursGroup(index) && this.isValidOpeningHoursGroupAt(index);

  private updateFilters = () =>
    this.selectOpeningHours.emit(this.openingHoursForm.controls.filter(onlyValidControl).map(fromControlToOpeningHoursFields));

  public removeOpeningHours(removeIndex: number): void {
    this.openingHoursForm.controls = this.openingHoursForm.controls.filter(exceptGroupAt(removeIndex));
    this.updateFilters();
  }

  public onDaySelect(openingHoursFormGroup: FormGroup<OpeningHoursControls>): void {
    openingHoursFormGroup.controls.day.value === 'now' && openingHoursFormGroup.reset({ ...DEFAULT_OPENING_HOURS, day: 'now' });
  }

  public onOpeningHourChanges(index: number, event?: Event): void {
    if (event) {
      this.openingHoursForm.at(index).controls.period.setValue((event.target as HTMLInputElement).checked ? 'all' : 'hours');
      this.updateFilters();
    }

    this.appendOpeningHoursFieldFor(index) && this.openingHoursForm.controls.push(openingHoursFormControl());
    this.isValidOpeningHoursGroupAt(index) && this.updateFilters();
  }

  public onResetOpeningHoursForm(): void {
    this.openingHoursForm.controls = [];
    this.openingHoursForm.controls.push(openingHoursFormControl());
    this.selectOpeningHours.emit();
  }

  public clearDateInput(index: number, field: string): void {
    this.openingHoursForm.at(index).controls[field as keyof OpeningHoursControls].setValue('');
    this.updateFilters();
  }
}
