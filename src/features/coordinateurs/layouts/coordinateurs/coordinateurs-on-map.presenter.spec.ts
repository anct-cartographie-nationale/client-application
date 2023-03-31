import { CoordinateurOnMapPresentation } from './coordinateur-on-map.presentation';
import { firstValueFrom, Observable, of } from 'rxjs';
import { CoordinateursFilterPresentation } from '../../presenters';
import {
  CoordinateursOnMapPresenter,
  countCoordinateursBassinDeVie,
  countCoordinateursDepartementaux
} from './coordinateurs-on-map.presenter';

describe('coordinateurs on map presenter', (): void => {
  it('should not filter coordinateurs', async (): Promise<void> => {
    const coordinateursOnMapPresenter: CoordinateursOnMapPresenter = new CoordinateursOnMapPresenter();

    const count: number = (await firstValueFrom(coordinateursOnMapPresenter.coordinateurs$())).length;

    expect(count).toBe(29);
  });

  it('should filter coordinateurs Départemental and Bassin de vie', async (): Promise<void> => {
    const coordinateursFilter$: Observable<CoordinateursFilterPresentation> = of({
      perimetre: ['Départemental', 'Bassin de vie']
    });
    const coordinateursOnMapPresenter: CoordinateursOnMapPresenter = new CoordinateursOnMapPresenter();

    const count: number = (await firstValueFrom(coordinateursOnMapPresenter.coordinateurs$(coordinateursFilter$))).length;

    expect(count).toBe(0);
  });

  it('should count coordinateurs départementaux', (): void => {
    const coordinateurs: CoordinateurOnMapPresentation[] = [
      {
        perimetre: 'Départemental'
      } as CoordinateurOnMapPresentation,
      {
        perimetre: 'Bassin de vie'
      } as CoordinateurOnMapPresentation,
      {
        perimetre: 'Départemental'
      } as CoordinateurOnMapPresentation,
      {
        perimetre: 'Départemental'
      } as CoordinateurOnMapPresentation
    ];

    const count = countCoordinateursDepartementaux(coordinateurs);

    expect(count).toBe(3);
  });

  it('should count coordinateurs bassin de vie', (): void => {
    const coordinateurs: CoordinateurOnMapPresentation[] = [
      {
        perimetre: 'Départemental'
      } as CoordinateurOnMapPresentation,
      {
        perimetre: 'Bassin de vie'
      } as CoordinateurOnMapPresentation,
      {
        perimetre: 'Bassin de vie'
      } as CoordinateurOnMapPresentation,
      {
        perimetre: 'Bassin de vie'
      } as CoordinateurOnMapPresentation
    ];

    const count = countCoordinateursBassinDeVie(coordinateurs);

    expect(count).toBe(3);
  });
});
