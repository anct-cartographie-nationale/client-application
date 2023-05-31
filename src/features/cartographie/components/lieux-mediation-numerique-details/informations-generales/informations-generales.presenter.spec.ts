import { isTooOld } from './informations-generales.presenter';

describe('informations générales presenter', (): void => {
  it('should indicates that a lieu date is too old', (): void => {
    const now: Date = new Date('2023-05-31');
    const date: Date = new Date('2023-02-02');

    const tooOld: boolean = isTooOld(now)(date);

    expect(tooOld).toBe(false);
  });

  it('should indicates that a lieu date is not too old', (): void => {
    const now: Date = new Date('2023-05-31');
    const date: Date = new Date('2022-02-02');

    const tooOld: boolean = isTooOld(now)(date);

    expect(tooOld).toBe(true);
  });
});
