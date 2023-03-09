import { WeekDay } from '@angular/common';
import { Time } from '../filter';
import {
  openingState,
  isOpenNow,
  parseHoraires,
  OpeningState,
  isOpenOn,
  dateTimeFor,
  firstDayOfTheWeek,
  lastDayOfTheWeek,
  dayOfTheWeek
} from './horaires.presenter';

describe('horaires presenter', (): void => {
  it('should get time table opening hours from osm opening hours, open every working day', (): void => {
    const openingHours: string = 'Mo-Fr 09:00-12:00,14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timeTableOpeningHours = parseHoraires(date)(openingHours);

    expect(timeTableOpeningHours).toStrictEqual({
      Lundi: '09h00 - 12h00\n14h00 - 18h30',
      Mardi: '09h00 - 12h00\n14h00 - 18h30',
      Mercredi: '09h00 - 12h00\n14h00 - 18h30',
      Jeudi: '09h00 - 12h00\n14h00 - 18h30',
      Vendredi: '09h00 - 12h00\n14h00 - 18h30',
      Samedi: 'Fermé',
      Dimanche: 'Fermé'
    });
  });

  it('should not get time table opening hours from osm opening hours when osm opening hours is not formatted properly', (): void => {
    const openingHours: string = 'Mo-AM 09:00-12:00,14:00-18:30';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const timeTableOpeningHours = parseHoraires(date)(openingHours);

    expect(timeTableOpeningHours).toStrictEqual(undefined);
  });

  it('should get Ouvert state', (): void => {
    const openingHours: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';
    const date: Date = new Date('2022-07-22T09:00:00.000Z');

    const status: OpeningState | undefined = openingState(date)(openingHours);

    expect(status).toStrictEqual({
      label: 'Ouvert',
      limite: 'Ferme à 12h00'
    });
  });

  it('should get Ouvert state', (): void => {
    const openingHours: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';
    const date: Date = new Date('2022-07-22T06:00:00.000Z');

    const status: OpeningState | undefined = openingState(date)(openingHours);

    expect(status).toStrictEqual({
      label: 'Fermé',
      limite: "Ouvre aujourd'hui à 09h00"
    });
  });

  it('should get Fermé state', (): void => {
    const openingHours: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';
    const date: Date = new Date('2022-07-24T01:00:00.000Z');

    const status: OpeningState | undefined = openingState(date)(openingHours);

    expect(status).toStrictEqual({
      label: 'Fermé',
      limite: 'Ouvre lundi à 09h00'
    });
  });

  it('should get undefined state one opening hours parse error', (): void => {
    const openingHours: string = 'Mo-AM 09:00-12:00,14:00-18:30; Sa 08:30-12:00';
    const date: Date = new Date('2022-07-22T11:30:00.000Z');

    const status: OpeningState | undefined = openingState(date)(openingHours);

    expect(status).toBeUndefined();
  });

  it('should get is open state for date and time', (): void => {
    const isOpenResult: boolean = isOpenNow(new Date('2022-07-22T09:00:00.000Z'))(
      'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
    );

    expect(isOpenResult).toStrictEqual(true);
  });

  it('should get first day of the week', (): void => {
    const date: Date = new Date('2023-03-03T17:02:08.686Z');

    const mondayDate: Date = firstDayOfTheWeek(date);

    expect(mondayDate).toStrictEqual(new Date('2023-02-27T17:02:08.686Z'));
  });

  it('should get last day of the week', (): void => {
    const date: Date = new Date('2023-03-03T17:02:08.686Z');

    const mondayDate: Date = lastDayOfTheWeek(date);

    expect(mondayDate).toStrictEqual(new Date('2023-03-05T17:02:08.686Z'));
  });

  it('should get specified day of the week', (): void => {
    const date: Date = new Date('2023-03-03T17:02:08.686Z');

    const mondayDate: Date = dayOfTheWeek(date, WeekDay.Wednesday);

    expect(mondayDate).toStrictEqual(new Date('2023-03-01T17:02:08.686Z'));
  });

  it('should be open on wednesday between 18:00 and 18:30', (): void => {
    const date: Date = new Date('2023-02-27T14:45:18.276Z');
    const horairesOSM: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';
    const startTime: Time = '18:00';
    const endTime: Time = '18:30';

    const isOpenResult: boolean = isOpenOn(date)(horairesOSM, WeekDay.Wednesday, startTime, endTime);

    expect(isOpenResult).toBe(true);
  });

  it('should not be open on wednesday between 12:30 and 13:30', (): void => {
    const date: Date = new Date('2023-03-07T17:02:08.686Z');
    const horairesOSM: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';
    const startTime: Time = '12:30';
    const endTime: Time = '13:30';

    const isOpenResult: boolean = isOpenOn(date)(horairesOSM, WeekDay.Wednesday, startTime, endTime);

    expect(isOpenResult).toBe(false);
  });

  it('should not be open on sunday', (): void => {
    const date: Date = new Date('2023-03-07T17:02:08.686Z');
    const horairesOSM: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';

    const isOpenResult: boolean = isOpenOn(date)(horairesOSM, WeekDay.Sunday);

    expect(isOpenResult).toBe(false);
  });

  it('should be open on tuesday', (): void => {
    const date: Date = new Date('2023-03-07T17:02:08.686Z');
    const horairesOSM: string = 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00';

    const isOpenResult: boolean = isOpenOn(date)(horairesOSM, WeekDay.Tuesday);

    expect(isOpenResult).toBe(true);
  });

  it('should get date time for specified day at 12:30', (): void => {
    const date: Date = new Date('2023-03-07T17:02:08.686Z');
    const time: Time = '12:30';

    const dateTime: Date = dateTimeFor(date)(WeekDay.Wednesday, time);

    expect(dateTime.getTime()).toBe(1678278600000 + date.getTimezoneOffset() * 60 * 1000);
  });
});
