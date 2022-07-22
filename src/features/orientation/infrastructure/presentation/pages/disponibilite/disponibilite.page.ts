import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrientationLayout } from '../../layouts';
import { FormControl } from '@angular/forms';

const currentDate = () => new Date().toISOString().substring(0, 10);

const currentTime = () => new Date().toISOString().substring(0, 10);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disponibilite.page.html'
})
export class DisponibilitePage {
  public ouvertActuellementFormControl: FormControl = new FormControl(
    this.orientationLayout.filterForm.get('heure_ouverture')?.value
  );

  public constructor(public readonly orientationLayout: OrientationLayout) {}

  private clearDateOuverture(): void {
    this.orientationLayout.filterForm.get('date_ouverture')?.reset();
    this.ouvertActuellementFormControl.reset();
  }

  private clearHeureOuverture(): void {
    this.orientationLayout.filterForm.get('heure_ouverture')?.reset();
    this.ouvertActuellementFormControl.reset();
  }

  private setDateOuverture(dateOuverture: string = currentDate()): void {
    this.orientationLayout.filterForm.get('date_ouverture')?.setValue(dateOuverture);
  }

  private setHeureOuverture(): void {
    this.orientationLayout.filterForm.get('heure_ouverture')?.setValue(currentTime());
  }

  private setDateEtHeureOuverture(): void {
    this.setDateOuverture();
    this.setHeureOuverture();
  }

  public setDateOuvertureToNow(event: Event & { target: HTMLInputElement }) {
    event.target.checked ? this.setDateEtHeureOuverture() : this.clearHeureOuverture();
  }

  public selectDate(event: Event & { target: HTMLInputElement }) {
    this.clearHeureOuverture();
    event.target.value === '' ? this.clearDateOuverture() : this.setDateOuverture(event.target.value);
  }
}
