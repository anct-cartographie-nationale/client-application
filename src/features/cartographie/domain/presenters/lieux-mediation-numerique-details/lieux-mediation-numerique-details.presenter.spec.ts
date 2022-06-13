import { Structure } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueDetailsPresenter } from './lieux-mediation-numerique-details.presenter';
import { firstValueFrom, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';

describe('lieux médiation numérique details presenter', (): void => {
  it('should filter only structure with id', async (): Promise<void> => {
    const structures: Structure[] = [new Structure(), new Structure({ _id: '6001a35f16b08100062e415f' })];
    const params: { [key: string]: string } = {
      id: '6001a35f16b08100062e415f'
    };

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(structures)
      } as LieuxMediationNumeriqueRepository);

    const structure = await firstValueFrom(lieuxMediationNumeriqueDetailsPresenter.structureFromParams$(of(params)));

    expect(structure).toStrictEqual(new Structure({ _id: '6001a35f16b08100062e415f' }));
  });

  it('should find the structure matching the id param', async (): Promise<void> => {
    const structures: Structure[] = [
      new Structure({ _id: '61e9260c2ac971550065e262' }),
      new Structure({ _id: '6001a35f16b08100062e415f' }),
      new Structure({ _id: '6001a3b716b08100062e4168' })
    ];

    const params: { [key: string]: string } = {
      id: '6001a35f16b08100062e415f'
    };

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(structures)
      } as LieuxMediationNumeriqueRepository);

    const structure = await firstValueFrom(lieuxMediationNumeriqueDetailsPresenter.structureFromParams$(of(params)));

    expect(structure).toStrictEqual(new Structure({ _id: '6001a35f16b08100062e415f' }));
  });
});
