import { openingState, isOpen, parseHoraires, OpeningState } from './horaires.presenter';

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
    const isOpenResult: boolean = isOpen(new Date('2022-07-22T09:00:00.000Z'))(
      'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
      true
    );

    expect(isOpenResult).toStrictEqual(true);
  });
});
