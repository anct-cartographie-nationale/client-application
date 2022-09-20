import { FormGroup } from '@angular/forms';

export function resetForm(filterForm: FormGroup, value: string | number, key: string) {
  if (key === 'services') filterForm.get('services')?.setValue('');
  else if (key === 'address' || key === 'distance') {
    filterForm.get('address')?.setValue('');
    filterForm.get('distance')?.setValue('');
    filterForm.get('latitude')?.setValue('');
    filterForm.get('longitude')?.setValue('');
  } else if (key === 'ouvert_actuellement') {
    filterForm.get('ouvert_actuellement')?.setValue(null);
    filterForm.get('date_ouverture')?.setValue(null);
  } else {
    const keyArrayCoppy = [...filterForm.value[key]];
    const indexOfValue = keyArrayCoppy.indexOf(value);
    indexOfValue > -1 && keyArrayCoppy.splice(indexOfValue, 1);
    filterForm.get(key)?.setValue([...keyArrayCoppy]);
  }
}

export function formatDistance(distance: string | number): string {
  if (distance === 100000 || distance === '100000') return 'Moins de 100 km';
  else if (distance === 20000 || distance === '20000') return 'Moins de 20 km';
  else return 'Moins de 5 km';
}
