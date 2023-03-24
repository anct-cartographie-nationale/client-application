import { PhonePipe } from './phone.pipe';

describe('phone pipe', (): void => {
  it('should format international french phone numbers', (): void => {
    const phonePipe: PhonePipe = new PhonePipe();
    expect(phonePipe.transform('+33685412369')).toBe('+33 6 85 41 23 69');
  });

  it('should format international french phone numbers from French Guiana', (): void => {
    const phonePipe: PhonePipe = new PhonePipe();
    expect(phonePipe.transform('+594194020905')).toBe('+594 1 94 02 09 05');
  });

  it('should format international french phone numbers from La Réunion', (): void => {
    const phonePipe: PhonePipe = new PhonePipe();
    expect(phonePipe.transform('+262262334565')).toBe('+262 2 62 33 45 65');
  });
});
