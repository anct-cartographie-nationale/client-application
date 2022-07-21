import { Structure } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueDetailsPresenter } from './lieux-mediation-numerique-details.presenter';
import { firstValueFrom, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from './lieu-mediation-numerique-details.presentation';
import { Adresse } from '../../../../../models/';

describe('lieux médiation numérique details presenter', (): void => {
  it('should filter only structure with id', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        id: '6001a35f16b08100062e415f',
        adresse: Adresse({
          commune: 'Reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        })
      } as LieuMediationNumerique
    ];
    const params: { [key: string]: string } = {
      id: '6001a35f16b08100062e415f'
    };

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(lieuxMediationNumerique)
      } as LieuxMediationNumeriqueRepository);

    const structure: LieuMediationNumeriqueDetailsPresentation = await firstValueFrom(
      lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(of(params))
    );

    expect(structure).toStrictEqual({
      id: '6001a35f16b08100062e415f',
      typologie: undefined,
      horaires: undefined,
      adresse: `12 BIS RUE DE LECLERCQ Le patio du bois de l'Aulne 51100 Reims`
    } as LieuMediationNumeriqueDetailsPresentation);
  });

  it('should find the structure matching the id param', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      { id: '61e9260c2ac971550065e262' } as LieuMediationNumerique,
      {
        id: '6001a35f16b08100062e415f',
        adresse: Adresse({
          commune: 'Reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        })
      } as LieuMediationNumerique,
      { id: '6001a3b716b08100062e4168' } as LieuMediationNumerique
    ];

    const params: { [key: string]: string } = {
      id: '6001a35f16b08100062e415f'
    };

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(lieuxMediationNumerique)
      } as LieuxMediationNumeriqueRepository);

    const structure: LieuMediationNumeriqueDetailsPresentation = await firstValueFrom(
      lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(of(params))
    );

    expect(structure).toStrictEqual({
      id: '6001a35f16b08100062e415f',
      typologie: undefined,
      horaires: undefined,
      adresse: `12 BIS RUE DE LECLERCQ Le patio du bois de l'Aulne 51100 Reims`
    } as LieuMediationNumeriqueDetailsPresentation);
  });
});
