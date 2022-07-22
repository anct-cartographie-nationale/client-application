import { isOpen } from './horaires.presenter';

describe('horaires presenter', (): void => {
  it('should get is open state for date and time', (): void => {
    const isOpenResult: boolean = isOpen(new Date('2022-07-22T09:00:00.000Z'))(
      'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
      true
    );

    expect(isOpenResult).toStrictEqual(true);
  });
});
