import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { Siret } from '../../../../../models/siret/siret';
import { Adresse } from '../../../../../models/adresse/adresse';
import { Localisation } from '../../../../../models/localisation/localisation';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { CartographiePresenter } from './cartographie.presenter';
import { Contact } from '../../../../../models/contact/contact';
import { Url } from '../../../../../models/url/url';

describe('cartographie presenter', (): void => {
  it('should get structure form lieux mediation numerique', async (): Promise<void> => {
    const lieuMediationNumeriqueTestRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => {
        return of([
          {
            id: Siret('77556026100015'),
            nom: "Association l'espoir (Groupe SOS)",
            adresse: Adresse({
              commune: 'MARSEILLE',
              code_postal: '13211',
              code_insee: '13055',
              voie: '4 AV DE SAINT MENET'
            }),
            localisation: Localisation({
              latitude: 4.8375548,
              longitude: 45.7665478
            }),
            contact: Contact({
              courriel: 'accueil@chrs-laselonne.fr',
              telephone: '+33458962172',
              site_web: Url('https://chrs-laselonne.fr')
            }),
            services: [
              'Prendre en main un smartphone ou une tablette',
              'Prendre en main un ordinateur',
              'Utiliser le numérique au quotidien',
              'Approfondir ma culture numérique'
            ],
            labels_nationaux: ['Aidants Connect', 'France Services'],
            date_maj: new Date('2022-05-09')
          }
        ]);
      }
    };

    const cartographiePresenter: CartographiePresenter = new CartographiePresenter(lieuMediationNumeriqueTestRepository);

    const structures: Structure[] = await firstValueFrom(cartographiePresenter.getStructures$());

    expect(structures).toStrictEqual([
      new Structure({
        _id: '77556026100015',
        address: {
          commune: 'MARSEILLE',
          coordinates: [45.7665478, 4.8375548],
          postcode: '13211',
          street: '4 AV DE SAINT MENET'
        },
        contactMail: 'accueil@chrs-laselonne.fr',
        contactPhone: '+33458962172',
        website: 'https://chrs-laselonne.fr',
        coord: [45.7665478, 4.8375548],
        structureName: "Association l'espoir (Groupe SOS)",
        labelsQualifications: ['Aidants Connect', 'France Services'],
        updatedAt: '2022-05-09T00:00:00.000Z'
      })
    ]);
  });

  it('should get structure form lieux mediation numerique only required fields', async (): Promise<void> => {
    const lieuMediationNumeriqueTestRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => {
        return of([
          {
            id: Siret('77556026100015'),
            nom: "Association l'espoir (Groupe SOS)",
            adresse: Adresse({
              commune: 'MARSEILLE',
              code_postal: '13211',
              code_insee: '13055',
              voie: '4 AV DE SAINT MENET'
            }),
            localisation: Localisation({
              latitude: 4.8375548,
              longitude: 45.7665478
            }),
            services: [
              'Prendre en main un smartphone ou une tablette',
              'Prendre en main un ordinateur',
              'Utiliser le numérique au quotidien',
              'Approfondir ma culture numérique'
            ]
          }
        ]);
      }
    };

    const cartographiePresenter: CartographiePresenter = new CartographiePresenter(lieuMediationNumeriqueTestRepository);

    const structures: Structure[] = await firstValueFrom(cartographiePresenter.getStructures$());

    expect(structures).toStrictEqual([
      new Structure({
        _id: '77556026100015',
        address: {
          commune: 'MARSEILLE',
          coordinates: [45.7665478, 4.8375548],
          postcode: '13211',
          street: '4 AV DE SAINT MENET'
        },
        coord: [45.7665478, 4.8375548],
        structureName: "Association l'espoir (Groupe SOS)"
      })
    ]);
  });
});
