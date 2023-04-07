import { firstValueFrom } from 'rxjs';
import { ConseillersOnMapPresenter } from './conseillers-on-map.presenter';

describe('conseillers on map presenter', (): void => {
  it('should get all conseillers on map', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter();

    const count: number = (await firstValueFrom(conseillersOnMapPresenter.conseillers$())).length;

    expect(count).toBe(42);
  });

  it('should get conseillers coordonnés count', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter();

    const count: number = await firstValueFrom(conseillersOnMapPresenter.nombreConseillersCoordonnes$);

    expect(count).toBe(40);
  });

  it('should get conseillers non-coordonnés count', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter();

    const count: number = await firstValueFrom(conseillersOnMapPresenter.nombreConseillersNonCoordonnes$);

    expect(count).toBe(2);
  });
});
