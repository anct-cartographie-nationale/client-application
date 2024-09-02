import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import {
  Adresse,
  Contact,
  Courriel,
  DispositifProgrammeNational,
  DispositifProgrammesNationaux,
  Frais,
  FraisACharge,
  Id,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  Nom,
  Pivot,
  PriseEnChargeSpecifique,
  PrisesEnChargeSpecifiques,
  PublicSpecifiquementAdresse,
  PublicsSpecifiquementAdresses,
  SchemaLieuMediationNumerique,
  Service,
  Services,
  Typologie,
  Typologies,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { DataConfiguration } from '../../../../../root';
import { LieuxMediationNumeriqueHttp } from './lieux-mediation-numerique.http';
import { Aidants, LieuMediationNumeriqueWithAidants } from '../../../models';

describe('lieux mediation numérique http', (): void => {
  it('should get all', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<SchemaLieuMediationNumerique[]> => {
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
            typologie: [Typologie.TIERS_LIEUX, Typologie.ASSO].join('|'),
            telephone: '+33180059880',
            courriels: 'contact@laquincaillerie.tl',
            site_web: ['https://www.laquincaillerie.tl/', 'https://m.facebook.com/laquincaillerienumerique/'].join('|'),
            horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
            presentation_resume:
              'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
            presentation_detail:
              "Notre parcours d'initiation permet l'acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d'accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.",
            source: 'Hubik',
            structure_parente: 'Pôle emploi',
            date_maj: '2022-06-02',
            publics_specifiquement_adresses: [
              PublicSpecifiquementAdresse.FamillesEnfants,
              PublicSpecifiquementAdresse.Seniors
            ].join('|'),
            prise_en_charge_specifique: [PriseEnChargeSpecifique.Surdite, PriseEnChargeSpecifique.DeficienceVisuelle].join('|'),
            services: [
              Service.AideAuxDemarchesAdministratives,
              Service.MaitriseDesOutilsNumeriquesDuQuotidien,
              Service.ComprehensionDuMondeNumerique,
              Service.UtilisationSecuriseeDuNumerique,
              Service.InsertionProfessionnelleViaLeNumerique,
              Service.AccesInternetEtMaterielInformatique
            ].join('|'),
            frais_a_charge: [Frais.Gratuit, Frais.Payant].join('|'),
            dispositif_programmes_nationaux: [
              DispositifProgrammeNational.FranceServices,
              DispositifProgrammeNational.FranceServices,
              DispositifProgrammeNational.AidantsConnect
            ].join('|'),
            autres_formations_labels: ['SudLabs', 'Nièvre médiation numérique'].join('|'),
            modalites_accompagnement: [
              ModaliteAccompagnement.EnAutonomie,
              ModaliteAccompagnement.AccompagnementIndividuel
            ].join('|'),
            fiche_acces_libre:
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
        id: Id('structure-1'),
        pivot: Pivot('43493312300029'),
        nom: Nom('Anonymal'),
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
        typologies: Typologies([Typologie.TIERS_LIEUX, Typologie.ASSO]),
        contact: Contact({
          telephone: '+33180059880',
          courriels: [Courriel('contact@laquincaillerie.tl')],
          site_web: [Url('https://www.laquincaillerie.tl/'), Url('https://m.facebook.com/laquincaillerienumerique/')]
        }),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation: {
          resume: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
          detail:
            "Notre parcours d'initiation permet l'acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d'accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX."
        },
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
        date_maj: new Date('2022-06-02'),
        publics_specifiquement_adresses: PublicsSpecifiquementAdresses([
          PublicSpecifiquementAdresse.FamillesEnfants,
          PublicSpecifiquementAdresse.Seniors
        ]),
        prise_en_charge_specifique: PrisesEnChargeSpecifiques([
          PriseEnChargeSpecifique.Surdite,
          PriseEnChargeSpecifique.DeficienceVisuelle
        ]),
        services: Services([
          Service.AideAuxDemarchesAdministratives,
          Service.MaitriseDesOutilsNumeriquesDuQuotidien,
          Service.ComprehensionDuMondeNumerique,
          Service.UtilisationSecuriseeDuNumerique,
          Service.InsertionProfessionnelleViaLeNumerique,
          Service.AccesInternetEtMaterielInformatique
        ]),
        dispositif_programmes_nationaux: DispositifProgrammesNationaux([
          DispositifProgrammeNational.FranceServices,
          DispositifProgrammeNational.FranceServices,
          DispositifProgrammeNational.AidantsConnect
        ]),
        frais_a_charge: FraisACharge([Frais.Gratuit, Frais.Payant]),
        autres_formations_labels: ['SudLabs', 'Nièvre médiation numérique'],
        modalites_accompagnement: ModalitesAccompagnement([
          ModaliteAccompagnement.EnAutonomie,
          ModaliteAccompagnement.AccompagnementIndividuel
        ]),
        fiche_acces_libre: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        prise_rdv: Url('https://www.rdv-solidarites.fr/')
      }
    ]);
  });

  it('should get all with only required fields', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<SchemaLieuMediationNumerique[]> => {
        return of([
          {
            id: 'cf52c480-2461-4011-b299-10353b64e323',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            adresse: '4 AV DE SAINT MENET',
            services: [
              Service.MaitriseDesOutilsNumeriquesDuQuotidien,
              Service.ComprehensionDuMondeNumerique,
              Service.UtilisationSecuriseeDuNumerique,
              Service.LoisirsEtCreationsNumeriques
            ].join('|'),
            latitude: 4.8375548,
            longitude: 45.7665478,
            date_maj: '2022-12-05',
            pivot: '91224046510114'
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
        id: Id('cf52c480-2461-4011-b299-10353b64e323'),
        nom: Nom("Association l'espoir (Groupe SOS)"),
        pivot: Pivot('91224046510114'),
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
          voie: '4 AV DE SAINT MENET'
        }),
        localisation: Localisation({
          latitude: 4.8375548,
          longitude: 45.7665478
        }),
        services: Services([
          Service.MaitriseDesOutilsNumeriquesDuQuotidien,
          Service.ComprehensionDuMondeNumerique,
          Service.UtilisationSecuriseeDuNumerique,
          Service.LoisirsEtCreationsNumeriques
        ]),
        date_maj: new Date('2022-12-05T00:00:00.000Z')
      }
    ]);
  });

  it('should get all without coordinates', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<SchemaLieuMediationNumerique[]> => {
        return of([
          {
            id: 'cf52c480-2461-4011-b299-10353b64e323',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            code_insee: '13055',
            adresse: '4 AV DE SAINT MENET',
            services: [
              Service.MaitriseDesOutilsNumeriquesDuQuotidien,
              Service.ComprehensionDuMondeNumerique,
              Service.UtilisationSecuriseeDuNumerique,
              Service.LoisirsEtCreationsNumeriques
            ].join('|'),
            date_maj: '2022-12-05',
            pivot: '91224046510114'
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
        id: Id('cf52c480-2461-4011-b299-10353b64e323'),
        nom: Nom("Association l'espoir (Groupe SOS)"),
        pivot: Pivot('91224046510114'),
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
          code_insee: '13055',
          voie: '4 AV DE SAINT MENET'
        }),
        services: Services([
          Service.MaitriseDesOutilsNumeriquesDuQuotidien,
          Service.ComprehensionDuMondeNumerique,
          Service.UtilisationSecuriseeDuNumerique,
          Service.LoisirsEtCreationsNumeriques
        ]),
        date_maj: new Date('2022-12-05T00:00:00.000Z')
      }
    ]);
  });

  it('should get all with aidants', async (): Promise<void> => {
    const dataConfiguration: DataConfiguration = {} as DataConfiguration;
    const httpClient: HttpClient = {
      get: (): Observable<SchemaLieuMediationNumerique[]> => {
        return of([
          {
            id: 'cf52c480-2461-4011-b299-10353b64e323',
            nom: "Association l'espoir (Groupe SOS)",
            commune: 'MARSEILLE',
            code_postal: '13211',
            code_insee: '13055',
            adresse: '4 AV DE SAINT MENET',
            services: [
              Service.MaitriseDesOutilsNumeriquesDuQuotidien,
              Service.ComprehensionDuMondeNumerique,
              Service.UtilisationSecuriseeDuNumerique,
              Service.LoisirsEtCreationsNumeriques
            ].join('|'),
            date_maj: '2022-12-05',
            pivot: '91224046510114',
            aidants: [
              {
                nom: 'John Doe',
                telephone: '+33156987423',
                courriel: 'john.doe@conseiller-numerique.fr'
              }
            ]
          }
        ]);
      }
    } as unknown as HttpClient;

    const lieuxMediationNumeriqueHttp: LieuxMediationNumeriqueHttp = new LieuxMediationNumeriqueHttp(
      dataConfiguration,
      httpClient
    );

    const lieuxMediationNumerique: LieuMediationNumeriqueWithAidants[] = await firstValueFrom(
      lieuxMediationNumeriqueHttp.getAll$()
    );

    expect(lieuxMediationNumerique).toStrictEqual<LieuMediationNumeriqueWithAidants[]>([
      {
        id: Id('cf52c480-2461-4011-b299-10353b64e323'),
        nom: Nom("Association l'espoir (Groupe SOS)"),
        pivot: Pivot('91224046510114'),
        adresse: Adresse({
          commune: 'MARSEILLE',
          code_postal: '13211',
          code_insee: '13055',
          voie: '4 AV DE SAINT MENET'
        }),
        services: Services([
          Service.MaitriseDesOutilsNumeriquesDuQuotidien,
          Service.ComprehensionDuMondeNumerique,
          Service.UtilisationSecuriseeDuNumerique,
          Service.LoisirsEtCreationsNumeriques
        ]),
        date_maj: new Date('2022-12-05T00:00:00.000Z'),
        aidants: Aidants([
          {
            nom: 'John Doe',
            telephone: '+33156987423',
            courriel: 'john.doe@conseiller-numerique.fr'
          }
        ])
      }
    ]);
  });
});
