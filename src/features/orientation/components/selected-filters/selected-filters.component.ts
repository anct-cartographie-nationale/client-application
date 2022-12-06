import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterFormPresentation } from '../../../core';
import conditionAcces from '../../pages/accessibilite/condition-acces.json';
import modaliteAccompagnements from '../../pages/accessibilite/modalite-accompagnements.json';
import publicAccueilli from '../../pages/accessibilite/public-accueilli.json';
import publicSpecifiqueAcceuilli from '../../pages/accessibilite/public-specifique-accueilli.json';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html'
})
export class SelectedFiltersComponent {
  @Input() public filterPresentation: FilterFormPresentation | null = null;
  @Input() public filterForm!: FormGroup;

  public resetForm(value: string | number, key: string) {
    if (key === 'service') this.filterForm.get('service')?.setValue('');
    else if (key === 'address' || key === 'distance') {
      this.filterForm.get('address')?.setValue('');
      this.filterForm.get('distance')?.setValue('');
      this.filterForm.get('latitude')?.setValue('');
      this.filterForm.get('longitude')?.setValue('');
    } else if (key === 'ouvert_actuellement') {
      this.filterForm.get('ouvert_actuellement')?.setValue(null);
      this.filterForm.get('date_ouverture')?.setValue(null);
    } else {
      const keyArrayCoppy = [...this.filterForm.value[key]];
      const indexOfValue = keyArrayCoppy.indexOf(value);
      indexOfValue > -1 && keyArrayCoppy.splice(indexOfValue, 1);
      this.filterForm.get(key)?.setValue([...keyArrayCoppy]);
    }
  }

  public formatDistance(distance: string | number): string {
    if (distance === 100000 || distance === '100000') return 'Moins de 100 km';
    else if (distance === 20000 || distance === '20000') return 'Moins de 20 km';
    else return 'Moins de 5 km';
  }

  public getLabelFromValue(value: string): string {
    return (
      [...conditionAcces, ...modaliteAccompagnements, ...publicAccueilli, ...publicSpecifiqueAcceuilli].find(
        (field: { value: string; label: string }) => {
          return field.value === value;
        }
      )?.label ?? ''
    );
  }
}
