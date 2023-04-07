import { firstValueFrom } from 'rxjs';
import { ConseillersOnMapPresenter } from './conseillers-on-map.presenter';

describe('conseillers on map presenter', (): void => {
  it('should get all conseillers on map', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter();

    const count: number = (await firstValueFrom(conseillersOnMapPresenter.conseillers$())).length;

    expect(count).toBe(42);
  });
});
