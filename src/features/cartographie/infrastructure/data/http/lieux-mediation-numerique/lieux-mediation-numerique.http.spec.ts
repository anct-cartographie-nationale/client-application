import { LieuxMediationNumeriqueHttp } from './lieux-mediation-numerique.http';
import { DataConfiguration } from '../../../../../../root';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueTransfer } from '../../transfers';

describe('lieux mediation numérique http', (): void => {
  it('should get all', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuxMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: '77556026100015',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE 11',
            code_postal: '13011',
            code_insee: 'MISSING',
            adresse: '4 AV DE SAINT MENET',
            services:
              'Prendre en main un smartphone ou une tablette, Prendre en main un ordinateur, Utiliser le numérique au quotidien, Approfondir ma culture numérique',
            latitude: 43.289439,
            longitude: 5.496495,
            telephone: '+33458962172',
            courriel: 'accueil@chrs-laselonne.fr',
            site_web: 'chrs-laselonne.fr',
            labels_nationaux: 'Aidants Connect, France Services',
            source: 'conseiller-numerique',
            date_maj: '2022-05-09',
            modalites_access: 'Gratuit'
          }
        ]);
      }
    } as unknown as HttpClient;

    const lieuxMediationNumeriqueHttp: LieuxMediationNumeriqueHttp = new LieuxMediationNumeriqueHttp(
      dataConfiguration,
      httpClient
    );

    const structures: Structure[] = await firstValueFrom(lieuxMediationNumeriqueHttp.getAll$());

    expect(structures).toStrictEqual([
      new Structure({
        _id: '77556026100015',
        address: {
          commune: 'MARSEILLE 11',
          coordinates: [5.496495, 43.289439],
          postcode: '13011',
          street: '4 AV DE SAINT MENET'
        },
        contactMail: 'accueil@chrs-laselonne.fr',
        contactPhone: '+33458962172',
        website: 'chrs-laselonne.fr',
        coord: [5.496495, 43.289439],
        structureName: "Association l'espoir (Groupe SOS)",
        labelsQualifications: ['Aidants Connect', 'France Services'],
        updatedAt: '2022-05-09'
      })
    ]);
  });

  it('should get all with only required fields', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuxMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: '77556026100015',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE 11',
            code_postal: '13011',
            code_insee: 'MISSING',
            adresse: '4 AV DE SAINT MENET',
            services:
              'Prendre en main un smartphone ou une tablette, Prendre en main un ordinateur, Utiliser le numérique au quotidien, Approfondir ma culture numérique',
            latitude: 43.289439,
            longitude: 5.496495
          }
        ]);
      }
    } as unknown as HttpClient;

    const lieuxMediationNumeriqueHttp: LieuxMediationNumeriqueHttp = new LieuxMediationNumeriqueHttp(
      dataConfiguration,
      httpClient
    );

    const structures: Structure[] = await firstValueFrom(lieuxMediationNumeriqueHttp.getAll$());

    expect(structures).toStrictEqual([
      new Structure({
        _id: '77556026100015',
        address: {
          commune: 'MARSEILLE 11',
          coordinates: [5.496495, 43.289439],
          postcode: '13011',
          street: '4 AV DE SAINT MENET'
        },
        coord: [5.496495, 43.289439],
        structureName: "Association l'espoir (Groupe SOS)"
      })
    ]);
  });

  it('should get all with defined coordinates', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuxMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: '77556026100015',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE 11',
            code_postal: '13011',
            code_insee: 'MISSING',
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

    const structures: Structure[] = await firstValueFrom(lieuxMediationNumeriqueHttp.getAll$());

    expect(structures).toStrictEqual([]);
  });
});
