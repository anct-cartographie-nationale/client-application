import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';
import { CoordinateurDetailsPresentation } from './coordinateur-details.presentation';
import { firstValueFrom } from 'rxjs';

describe('coordinateur details presenter', (): void => {
  it('should get coordinateur matching given id', async (): Promise<void> => {
    const coordinateur: CoordinateurDetailsPresentation | undefined = await firstValueFrom(
      new CoordinateurDetailsPresenter().coordinateur$('22b8d7ba-3de9-4c12-8a33-8b0a785d764c')
    );

    expect(coordinateur).toStrictEqual({
      id: '22b8d7ba-3de9-4c12-8a33-8b0a785d764c',
      nom: 'Lucie Petit',
      commune: 'Paris (75011)',
      adresse: '56 Rue Oberkampf, 75011 Paris',
      courriel: 'lucie.petit@depta.fr',
      telephone: '+33678543210',
      perimetre: 'Départemental',
      nombreDePersonnesCoordonnees: 13,
      nombreDeStructuresAvecDesPersonnesCoordonnees: 9,
      dispositif: 'CnFS',
      latitude: 48.86471611,
      longitude: 2.376019843,
      ifn: 4.2
    });
  });
});
