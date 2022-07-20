import { LieuxMediationNumeriqueHttp } from './lieux-mediation-numerique.http';
import { DataConfiguration } from '../../../../../../root';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuMediationNumeriqueTransfer } from '../../transfers/lieu-mediation-numerique.transfer';
import { Adresse, Localisation, Contact, Url, LieuMediationNumerique, Pivot, CleBan } from '../../../../../../models';

describe('lieux mediation numérique http', (): void => {
  it('should get all', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: 'structure-1',
            pivot: '43493312300029',
            nom: 'Anonymal',
            commune: 'Reims',
            code_postal: '51100',
            code_insee: '51454',
            adresse: '12 BIS RUE DE LECLERCQ',
            complement_adresse: "Le patio du bois de l'Aulne",
            latitude: 43.52609,
            longitude: 5.41423,
            cle_ban: '13001_3079_00001',
            typologie: 'TIERS_LIEUX,ASSO',
            telephone: '+33180059880',
            courriel: 'contact@laquincaillerie.tl',
            site_web: 'https://www.laquincaillerie.tl/,https://m.facebook.com/laquincaillerienumerique/',
            horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
            presentation_resumee:
              'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
            presentation_detail:
              "Notre parcours d'initiation permet l'acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d'accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.",
            source: 'Hubik',
            structure_parente: 'Pôle emploi',
            date_maj: '2022-06-02',
            publics_accueillis: 'Familles/enfants,Adultes,Déficience visuelle',
            services:
              'Devenir autonome dans les démarches administratives,Réaliser des démarches administratives avec un accompagnement,Prendre en main un smartphone ou une tablette,Prendre en main un ordinateur,Utiliser le numérique au quotidien,Approfondir ma culture numérique,Favoriser mon insertion professionnelle,Accéder à une connexion internet,Accéder à du matériel',
            conditions_access: 'Gratuit,Payant',
            labels_nationaux: 'France Services,APTIC,Point relais CAF',
            labels_autres: 'SudLabs,Nièvre médiation numérique',
            modalites_accompagnement: "Seul,Avec de l'aide",
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
        id: 'structure-1',
        pivot: Pivot('43493312300029'),
        nom: 'Anonymal',
        adresse: Adresse({
          commune: 'Reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        }),
        localisation: Localisation({
          latitude: 43.52609,
          longitude: 5.41423
        }),
        cle_ban: CleBan('13001_3079_00001'),
        typologie: ['TIERS_LIEUX', 'ASSO'],
        contact: Contact({
          telephone: '+33180059880',
          courriel: 'contact@laquincaillerie.tl',
          site_web: [Url('https://www.laquincaillerie.tl/'), Url('https://m.facebook.com/laquincaillerienumerique/')]
        }),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation: {
          resumee: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
          detail:
            "Notre parcours d'initiation permet l'acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d'accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX."
        },
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
        date_maj: new Date('2022-06-02'),
        publics_accueillis: ['Familles/enfants', 'Adultes', 'Déficience visuelle'],
        services: [
          'Devenir autonome dans les démarches administratives',
          'Réaliser des démarches administratives avec un accompagnement',
          'Prendre en main un smartphone ou une tablette',
          'Prendre en main un ordinateur',
          'Utiliser le numérique au quotidien',
          'Approfondir ma culture numérique',
          'Favoriser mon insertion professionnelle',
          'Accéder à une connexion internet',
          'Accéder à du matériel'
        ],
        labels_nationaux: ['France Services', 'APTIC', 'Point relais CAF'],
        conditions_access: ['Gratuit', 'Payant'],
        labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
        modalites_accompagnement: ['Seul', "Avec de l'aide"],
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
            id: 'cf52c480-2461-4011-b299-10353b64e323',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
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
        id: 'cf52c480-2461-4011-b299-10353b64e323',
        nom: "Association l'espoir (Groupe SOS)",
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
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
            id: 'cf52c480-2461-4011-b299-10353b64e323',
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

  it('should get lieu mediation numerique without contact email error', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: 'cf52c480-2461-4011-b299-10353b64e323',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            adresse: '4 AV DE SAINT MENET',
            services:
              'Prendre en main un smartphone ou une tablette, Prendre en main un ordinateur, Utiliser le numérique au quotidien, Approfondir ma culture numérique',
            latitude: 4.8375548,
            longitude: 45.7665478,
            courriel: 'contactlaquincaillerie.tl'
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
        id: 'cf52c480-2461-4011-b299-10353b64e323',
        nom: "Association l'espoir (Groupe SOS)",
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
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

  it('should get lieu mediation numerique without pivot error', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<LieuMediationNumeriqueTransfer[]> => {
        return of([
          {
            id: 'cf52c480-2461-4011-b299-10353b64e323',
            pivot: '123456',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
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
        id: 'cf52c480-2461-4011-b299-10353b64e323',
        nom: "Association l'espoir (Groupe SOS)",
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
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
});
