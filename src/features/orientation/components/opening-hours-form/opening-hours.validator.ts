import { AbstractControl, ValidationErrors } from '@angular/forms';
import { OpeningHours } from '../../../core';

const isOpenNow = (openingHoursFields: OpeningHours): boolean => openingHoursFields.day === 'now';

const isOpenAllDay = (openingHoursFields: OpeningHours): boolean =>
  openingHoursFields.day !== '' && openingHoursFields.period === 'all';

const hasStartAndEndHours = (openingHoursFields: OpeningHours): boolean =>
  openingHoursFields.start != null &&
  openingHoursFields.end != null &&
  openingHoursFields.start != '' &&
  openingHoursFields.end != '';

const startBeforeEndHour = (openingHoursFields: OpeningHours): boolean =>
  (openingHoursFields?.start ?? 0) < (openingHoursFields?.end ?? 0);

const isOpenOnSelectedHours = (openingHoursFields: OpeningHours): boolean =>
  openingHoursFields.day !== '' &&
  openingHoursFields.period === 'hours' &&
  hasStartAndEndHours(openingHoursFields) &&
  startBeforeEndHour(openingHoursFields);

export const isValidOpeningHours = (openingHoursFields: OpeningHours): boolean =>
  isOpenNow(openingHoursFields) || isOpenAllDay(openingHoursFields) || isOpenOnSelectedHours(openingHoursFields);

export const openingHoursValidator = (control: AbstractControl): ValidationErrors | null =>
  isValidOpeningHours(control.value) ? null : { invalidOpeningHours: { value: control.value } };
