import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterFormPresentation } from '../../../core/presenters';
import publicSpecifiqueAcceuilli from '../../pages/accessibilite/public-specifique-accueilli.json';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html'
})
export class SelectedFiltersComponent {
  @Input() public filterPresentation: FilterFormPresentation | null = null;
  @Input() public filterForm!: FormGroup;

  public resetForm(value: unknown, key: string) {
    if (key === 'service') this.filterForm.get('service')?.setValue(undefined);
    else if (key === 'address' || key === 'distance') {
      this.filterForm.get('address')?.setValue(undefined);
      this.filterForm.get('distance')?.setValue(undefined);
      this.filterForm.get('latitude')?.setValue(undefined);
      this.filterForm.get('longitude')?.setValue(undefined);
    } else if (key === 'horaires_ouverture') {
      this.filterForm.get('horaires_ouverture')?.setValue(undefined);
    } else if (key === 'prise_rdv') {
      this.filterForm.get('prise_rdv')?.setValue(false);
    } else if (key === 'accessibilite') {
      this.filterForm.get('accessibilite')?.setValue(false);
    } else {
      const keyArrayCoppy = [...this.filterForm.value[key]];
      const indexOfValue = keyArrayCoppy.indexOf(value);
      indexOfValue > -1 && keyArrayCoppy.splice(indexOfValue, 1);
      this.filterForm.get(key)?.setValue([...keyArrayCoppy]);
    }
  }

  public getLabelFromValue(value: string): string {
    return (
      [...publicSpecifiqueAcceuilli].find((field: { value: string; label: string }) => {
        return field.value === value;
      })?.label ?? ''
    );
  }

  public labelMap: Map<string, string> = new Map<LabelNational, string>([[LabelNational.CNFS, 'Conseillers Numériques']]);
}
