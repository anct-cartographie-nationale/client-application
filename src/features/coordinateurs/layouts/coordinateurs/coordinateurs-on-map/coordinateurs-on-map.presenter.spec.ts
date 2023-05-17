import { firstValueFrom, Observable, of } from 'rxjs';
import coordinateursData from '../../../data/coordinateurs.json';
import { CoordinateursRepository } from '../../../reporitories';
import { Coordinateur } from '../../../models';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map.presenter';

const coordinateursRepository: CoordinateursRepository = { getAll$: (): Observable<Coordinateur[]> => of(coordinateursData) };

describe('coordinateurs on map presenter', (): void => {
  it('should not filter coordinateurs', async (): Promise<void> => {
    const coordinateursOnMapPresenter: CoordinateursOnMapPresenter = new CoordinateursOnMapPresenter(coordinateursRepository);

    const count: number = (await firstValueFrom(coordinateursOnMapPresenter.coordinateurs$())).length;

    expect(count).toBe(29);
  });
});
