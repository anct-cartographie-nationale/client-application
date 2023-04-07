import { firstValueFrom } from 'rxjs';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map.presenter';

describe('coordinateurs on map presenter', (): void => {
  it('should not filter coordinateurs', async (): Promise<void> => {
    const coordinateursOnMapPresenter: CoordinateursOnMapPresenter = new CoordinateursOnMapPresenter();

    const count: number = (await firstValueFrom(coordinateursOnMapPresenter.coordinateurs$())).length;

    expect(count).toBe(29);
  });
});
