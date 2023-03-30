import { firstValueFrom, Observable, of } from 'rxjs';
import { CoordinateursFilterPresentation } from '../../presenters';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';

describe('coordinateur list presenter', (): void => {
  it('should not filter coordinateurs', async (): Promise<void> => {
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const count: number = (await firstValueFrom(coordinateursListPresenter.coordinateurs$())).length;

    expect(count).toBe(29);
  });

  it('should filter coordinateurs Départemental and Bassin de vie', async (): Promise<void> => {
    const coordinateursFilter$: Observable<CoordinateursFilterPresentation> = of({
      perimetre: ['Départemental', 'Bassin de vie']
    });
    const coordinateursListPresenter: CoordinateursListPresenter = new CoordinateursListPresenter();

    const count: number = (await firstValueFrom(coordinateursListPresenter.coordinateurs$(coordinateursFilter$))).length;

    expect(count).toBe(0);
  });
});
