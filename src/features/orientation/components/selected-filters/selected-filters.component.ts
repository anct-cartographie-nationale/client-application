import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DispositifProgrammeNational, PriseEnChargeSpecifique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FormGroup } from '@angular/forms';
import { FilterFormPresentation } from '../../../core/presenters';
import prisesEnChargeSpecifiques from '../../pages/accessibilite/prise-en-charge-specifique.json';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html'
})
export class SelectedFiltersComponent {
  @Input() public filterPresentation: FilterFormPresentation | null = null;
  @Input() public filterForm!: FormGroup;

  public resetForm(value: unknown, key: string): void {
    if (key === 'services') this.filterForm.get('services')?.reset();
    else if (key === 'address' || key === 'distance') {
      this.filterForm.get('address')?.reset();
      this.filterForm.get('distance')?.reset();
      this.filterForm.get('latitude')?.reset();
      this.filterForm.get('longitude')?.reset();
    } else if (key === 'horaires_ouverture') {
      this.filterForm.get('horaires_ouverture')?.reset();
    } else if (key === 'prise_rdv') {
      this.filterForm.get('prise_rdv')?.reset();
    } else if (key === 'fiche_acces_libre') {
      this.filterForm.get('fiche_acces_libre')?.reset();
    } else {
      const keyArrayCopy = [...this.filterForm.value[key]];
      const indexOfValue = keyArrayCopy.indexOf(value);
      indexOfValue > -1 && keyArrayCopy.splice(indexOfValue, 1);
      this.filterForm.get(key)?.setValue([...keyArrayCopy]);
    }
  }

  public getLabelFromValue(value: string): string {
    return (
      [...prisesEnChargeSpecifiques].find((field: { value: string; label: string }) => {
        return field.value === value;
      })?.label ?? ''
    );
  }

  public labelMap: Map<string, string> = new Map<DispositifProgrammeNational, string>([
    [DispositifProgrammeNational.ConseillersNumeriques, 'Conseillers Numériques']
  ]);
}
