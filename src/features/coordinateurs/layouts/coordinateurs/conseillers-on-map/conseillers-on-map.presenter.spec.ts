import { firstValueFrom, Observable, of } from 'rxjs';
import conseillersData from '../../../../../assets/data/conseillers.json';
import { ConseillersRepository } from '../../../reporitories';
import { Conseiller } from '../../../models';
import { ConseillersOnMapPresenter } from './conseillers-on-map.presenter';

const conseillersRepository: ConseillersRepository = {
  getAll$: (): Observable<Conseiller[]> => of(conseillersData)
} as ConseillersRepository;

describe('conseillers on map presenter', (): void => {
  it('should get all conseillers on map', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter(conseillersRepository);

    const count: number = (await firstValueFrom(conseillersOnMapPresenter.conseillers$())).length;

    expect(count).toBe(41);
  });

  it('should get conseillers coordonnés count', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter(conseillersRepository);

    const count: number = await firstValueFrom(conseillersOnMapPresenter.nombreConseillersCoordonnes$);

    expect(count).toBe(39);
  });

  it('should get conseillers non-coordonnés count', async (): Promise<void> => {
    const conseillersOnMapPresenter: ConseillersOnMapPresenter = new ConseillersOnMapPresenter(conseillersRepository);

    const count: number = await firstValueFrom(conseillersOnMapPresenter.nombreConseillersNonCoordonnes$);

    expect(count).toBe(2);
  });
});
