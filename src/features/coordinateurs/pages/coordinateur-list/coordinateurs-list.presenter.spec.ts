import { firstValueFrom, Observable, of } from 'rxjs';
import { CoordinateursSortPresentation } from '../../presenters';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';

describe('coordinateur list presenter', (): void => {
  it('should not filter coordinateurs', async (): Promise<void> => {
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const count: number = (await firstValueFrom(coordinateursListPresenter.coordinateurs$())).length;

    expect(count).toBe(29);
  });

  it('should sort coordinateurs by nom asc', async (): Promise<void> => {
    const coordinateursSort$: Observable<CoordinateursSortPresentation> = of({
      by: 'nom',
      direction: 'asc'
    });
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const coordinateurs: string[] = (await firstValueFrom(coordinateursListPresenter.coordinateurs$(coordinateursSort$)))
      .slice(0, 3)
      .map((coordinateur: CoordinateursListItemPresentation) => coordinateur.nom);

    expect(coordinateurs).toStrictEqual<string[]>(['Baraim', 'Bénédon', 'Bonnet']);
  });

  it('should sort coordinateurs by nom desc', async (): Promise<void> => {
    const coordinateursSort$: Observable<CoordinateursSortPresentation> = of({
      by: 'nom',
      direction: 'desc'
    });
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const coordinateurs: string[] = (await firstValueFrom(coordinateursListPresenter.coordinateurs$(coordinateursSort$)))
      .slice(0, 3)
      .map((coordinateur: CoordinateursListItemPresentation) => coordinateur.nom);

    expect(coordinateurs).toStrictEqual<string[]>(['Wong', 'Valloria', 'Serafi']);
  });

  it('should sort coordinateurs by code postal asc', async (): Promise<void> => {
    const coordinateursSort$: Observable<CoordinateursSortPresentation> = of({
      by: 'codePostal',
      direction: 'asc'
    });
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const coordinateurs: string[] = (await firstValueFrom(coordinateursListPresenter.coordinateurs$(coordinateursSort$)))
      .slice(0, 3)
      .map((coordinateur: CoordinateursListItemPresentation) => coordinateur.codePostal);

    expect(coordinateurs).toStrictEqual<string[]>(['12000', '13008', '14000']);
  });

  it('should sort coordinateurs by code postal desc', async (): Promise<void> => {
    const coordinateursSort$: Observable<CoordinateursSortPresentation> = of({
      by: 'codePostal',
      direction: 'desc'
    });
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const coordinateurs: string[] = (await firstValueFrom(coordinateursListPresenter.coordinateurs$(coordinateursSort$)))
      .slice(0, 3)
      .map((coordinateur: CoordinateursListItemPresentation) => coordinateur.codePostal);

    expect(coordinateurs).toStrictEqual<string[]>(['89000', '87000', '80000']);
  });

  it('should sort coordinateurs by nombre cnfs asc', async (): Promise<void> => {
    const coordinateursSort$: Observable<CoordinateursSortPresentation> = of({
      by: 'nombreCnfs',
      direction: 'asc'
    });
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const coordinateurs: number[] = (await firstValueFrom(coordinateursListPresenter.coordinateurs$(coordinateursSort$)))
      .slice(0, 3)
      .map((coordinateur: CoordinateursListItemPresentation) => coordinateur.nombreDePersonnesCoordonnees);

    expect(coordinateurs).toStrictEqual<number[]>([2, 3, 3]);
  });
});
