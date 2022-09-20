import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterFormPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html'
})
export class SelectedFiltersComponent {
  @Input() public filterPresentation: FilterFormPresentation | null = null;
  @Input() public filterForm!: FormGroup;

  public resetForm(value: string | number, key: string) {
    if (key === 'services') this.filterForm.get('services')?.setValue('');
    else if (key === 'distance') {
      this.filterForm.get('distance')?.setValue('');
    } else if (key === 'address') {
      this.filterForm.get('address')?.setValue('');
      this.filterForm.get('distance')?.setValue('');
      this.filterForm.get('latitude')?.setValue('');
      this.filterForm.get('longitude')?.setValue('');
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
}
