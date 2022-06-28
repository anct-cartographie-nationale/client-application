import { LieuxMediationNumeriqueHttp } from './lieux-mediation-numerique.http';
import { DataConfiguration } from '../../../../../../root';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Siret } from '../../../../../../models/siret/siret';
import { Adresse } from '../../../../../../models/adresse/adresse';
import { Localisation } from '../../../../../../models/localisation/localisation';
import { Contact } from '../../../../../../models/contact/contact';
import { Url } from '../../../../../../models/url/url';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { Siren } from '../../../../../../models/siren/siren';
import { LieuMediationNumeriqueTransfer } from '../../transfers/lieu-mediation-numerique.transfer';

describe('lieux mediation numérique http', (): void => {
  it('should get all', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: '77556026100015',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            code_insee: '13055',
            adresse: '4 AV DE SAINT MENET',
            complement_adresse: 'Allée 1',
            typologie: 'CHRS',
            horaires: 'Th 09:00-12:00,13:30-17:30',
            presentation_resumee: "Maitrisez le numérique avec Association l'espoir (Groupe SOS)",
            presentation_detail: "Plus d'informations sut l'association...",
            services:
              'Prendre en main un smartphone ou une tablette, Prendre en main un ordinateur, Utiliser le numérique au quotidien, Approfondir ma culture numérique',
            latitude: 4.8375548,
            longitude: 45.7665478,
            telephone: '+33458962172',
            courriel: 'accueil@chrs-laselonne.fr',
            site_web: 'https://chrs-laselonne.fr',
            labels_nationaux: 'Aidants Connect, France Services',
            source: 'conseiller-numerique',
            date_maj: '2022-05-09',
            modalites_access: 'Gratuit',
            structure_parente: '775560261',
            publics: 'Familles/enfants, Adultes, Déficience visuelle',
            labels_autres: 'SudLabs, Nièvre médiation numérique',
            types_accompagnement: 'seul, avec de l’aide',
            accessibilite:
              'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
            prise_rdv: 'https://www.rdv-solidarites.fr/'
          }
        ]);
      }
    } as unknown as HttpClient;

    const lieuxMediationNumeriqueHttp: LieuxMediationNumeriqueHttp = new LieuxMediationNumeriqueHttp(
      dataConfiguration,
      httpClient
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(lieuxMediationNumeriqueHttp.getAll$());

    expect(lieuxMediationNumerique).toStrictEqual<LieuMediationNumerique[]>([
      {
        id: Siret('77556026100015'),
        nom: "Association l'espoir (Groupe SOS)",
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
          code_insee: '13055',
          voie: '4 AV DE SAINT MENET',
          complement_adresse: 'Allée 1'
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
        ],
        contact: Contact({
          telephone: '+33458962172',
          courriel: 'accueil@chrs-laselonne.fr',
          site_web: Url('https://chrs-laselonne.fr')
        }),
        labels_nationaux: ['Aidants Connect', 'France Services'],
        source: 'conseiller-numerique',
        date_maj: new Date('2022-05-09'),
        modalites_access: ['Gratuit'],
        typologie: 'CHRS',
        horaires: 'Th 09:00-12:00,13:30-17:30',
        presentation: {
          resumee: "Maitrisez le numérique avec Association l'espoir (Groupe SOS)",
          detail: "Plus d'informations sut l'association..."
        },
        structure_parente: Siren('775560261'),
        publics: ['Familles/enfants', 'Adultes', 'Déficience visuelle'],
        labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
        types_accompagnement: ['seul', 'avec de l’aide'],
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        prise_rdv: Url('https://www.rdv-solidarites.fr/')
      }
    ]);
  });

  it('should get all with only required fields', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: '77556026100015',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            code_insee: '13055',
            adresse: '4 AV DE SAINT MENET',
            services:
              'Prendre en main un smartphone ou une tablette, Prendre en main un ordinateur, Utiliser le numérique au quotidien, Approfondir ma culture numérique',
            latitude: 4.8375548,
            longitude: 45.7665478
          }
        ]);
      }
    } as unknown as HttpClient;

    const lieuxMediationNumeriqueHttp: LieuxMediationNumeriqueHttp = new LieuxMediationNumeriqueHttp(
      dataConfiguration,
      httpClient
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(lieuxMediationNumeriqueHttp.getAll$());

    expect(lieuxMediationNumerique).toStrictEqual([
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
  });

  it('should get all with defined coordinates', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: '77556026100015',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            code_insee: '13055',
            adresse: '4 AV DE SAINT MENET',
            services:
              'Prendre en main un smartphone ou une tablette, Prendre en main un ordinateur, Utiliser le numérique au quotidien, Approfondir ma culture numérique'
          }
        ]);
      }
    } as unknown as HttpClient;

    const lieuxMediationNumeriqueHttp: LieuxMediationNumeriqueHttp = new LieuxMediationNumeriqueHttp(
      dataConfiguration,
      httpClient
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(lieuxMediationNumeriqueHttp.getAll$());

    expect(lieuxMediationNumerique).toStrictEqual([]);
  });
});
