import { OpeningHours } from '../../../core/presenters';
import { isValidOpeningHours } from './opening-hours.validator';

describe('opening hours validator', (): void => {
  it('should get valid openingHours when day is set to now', (): void => {
    const openingHoursFields: OpeningHours = {
      period: '',
      day: 'now'
    };

    const isValid = isValidOpeningHours(openingHoursFields);

    expect(isValid).toBe(true);
  });

  it('should get invalid when day field is not set', (): void => {
    const openingHoursFields: OpeningHours = {
      period: '',
      day: ''
    };

    const isValid = isValidOpeningHours(openingHoursFields);

    expect(isValid).toBe(false);
  });

  it('should get invalid when day field is not set to now and period is not set', (): void => {
    const openingHoursFields: OpeningHours = {
      period: '',
      day: 'all'
    };

    const isValid = isValidOpeningHours(openingHoursFields);

    expect(isValid).toBe(false);
  });

  it('should get invalid when day field is not set to now and period is set to hours', (): void => {
    const openingHoursFields: OpeningHours = {
      period: 'hours',
      day: 'all'
    };

    const isValid = isValidOpeningHours(openingHoursFields);

    expect(isValid).toBe(false);
  });

  it('should get invalid when day field is not set to now and period is set to hours with empty start and end hours', (): void => {
    const openingHoursFields: OpeningHours = {
      period: 'hours',
      day: 'all',
      start: '',
      end: ''
    };

    const isValid = isValidOpeningHours(openingHoursFields);

    expect(isValid).toBe(false);
  });

  it('should get invalid when day field when end time is before start time', (): void => {
    const openingHoursFields: OpeningHours = {
      period: 'hours',
      day: 'all',
      start: '14:00',
      end: '09:00'
    };

    const isValid = isValidOpeningHours(openingHoursFields);

    expect(isValid).toBe(false);
  });
});
