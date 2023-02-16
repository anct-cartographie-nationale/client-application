import { firstValueFrom, of } from 'rxjs';
import {
  Adresse,
  ConditionAcces,
  ConditionsAcces,
  Contact,
  Id,
  LabelNational,
  LabelsNationaux,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  Nom,
  PublicAccueilli,
  PublicsAccueillis,
  Service,
  Services,
  Typologie,
  Typologies,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuxMediationNumeriqueRepository, NO_LOCALISATION } from '../../../core';
import { LieuxMediationNumeriqueDetailsPresenter } from './lieux-mediation-numerique-details.presenter';
import { LieuMediationNumeriqueDetailsPresentation } from './lieu-mediation-numerique-details.presentation';
import { ParamMap } from '@angular/router';

describe('lieux médiation numérique details presenter', (): void => {
  it('should filter only lieu with id', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        id: Id('6001a35f16b08100062e415f'),
        nom: Nom('Anonymal'),
        adresse: Adresse({
          commune: 'reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        }),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        typologies: Typologies([Typologie.CHRS, Typologie.CHU]),
        contact: Contact({
          telephone: '+33180059880',
          courriel: 'contact@laquincaillerie.tl',
          site_web: [Url('https://www.laquincaillerie.tl/'), Url('https://m.facebook.com/laquincaillerienumerique/')]
        }),
        services: Services([Service.PrendreEnMainUnOrdinateur, Service.AccederADuMateriel]),
        presentation: {
          resume: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
          detail:
            "Notre parcours d'initiation permet l'acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d'accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX."
        },
        date_maj: new Date('2022-06-02'),
        publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes, PublicAccueilli.DeficienceVisuelle]),
        conditions_acces: ConditionsAcces([ConditionAcces.Gratuit, ConditionAcces.Payant]),
        labels_nationaux: LabelsNationaux([LabelNational.FranceServices, LabelNational.APTIC, LabelNational.PointRelaisCAF]),
        labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
        modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide]),
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(lieuxMediationNumerique)
      } as LieuxMediationNumeriqueRepository);

    const structure: LieuMediationNumeriqueDetailsPresentation = await firstValueFrom(
      lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(
        of(new Map<string, string>([['id', '6001a35f16b08100062e415f']]) as unknown as ParamMap),
        new Date('2022-07-22T14:55:00.000Z'),
        of(NO_LOCALISATION)
      )
    );

    expect(structure).toStrictEqual<LieuMediationNumeriqueDetailsPresentation>({
      id: '6001a35f16b08100062e415f',
      nom: 'Anonymal',
      adresse: `12 BIS RUE DE LECLERCQ Le patio du bois de l'Aulne 51100 Reims`,
      code_postal: '51100',
      commune: 'reims',
      horaires: {
        Lundi: '09h00 - 12h00\n14h00 - 18h30',
        Mardi: '09h00 - 12h00\n14h00 - 18h30',
        Mercredi: '09h00 - 12h00\n14h00 - 18h30',
        Jeudi: '09h00 - 12h00\n14h00 - 18h30',
        Vendredi: '09h00 - 12h00\n14h00 - 18h30',
        Samedi: '08h30 - 12h00',
        Dimanche: 'Fermé'
      },
      status: {
        label: 'Ouvert',
        limite: 'Ferme à 18h30'
      },
      typologies: 'CHRS, CHU',
      contact: Contact({
        telephone: '+33180059880',
        courriel: 'contact@laquincaillerie.tl',
        site_web: [Url('https://www.laquincaillerie.tl/'), Url('https://m.facebook.com/laquincaillerienumerique/')]
      }),
      services: [Service.PrendreEnMainUnOrdinateur, Service.AccederADuMateriel],
      presentation: {
        resume: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
        detail:
          "Notre parcours d'initiation permet l'acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d'accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX."
      },
      date_maj: new Date('2022-06-02'),
      publics_accueillis: ['Adultes', 'Déficience visuelle'],
      conditions_acces: 'Gratuit, Payant',
      labels_nationaux: [LabelNational.FranceServices, LabelNational.APTIC, LabelNational.PointRelaisCAF],
      labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
      modalites_accompagnement: [
        { label: 'Seul', icon: 'ri-user-3-line', description: "j'ai accès à du materiel et une connexion" },
        { label: "Avec de l'aide", icon: 'ri-group-line', description: "je suis accompagné dans l'usage du numérique" }
      ],
      accessibilite: Url(
        'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
      )
    } as LieuMediationNumeriqueDetailsPresentation);
  });

  it('should find the lieu matching the id param', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      { id: '61e9260c2ac971550065e262' } as LieuMediationNumerique,
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: Adresse({
          commune: 'reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        }),
        services: ['Prendre en main un ordinateur', 'Accéder à du matériel']
      } as LieuMediationNumerique,
      { id: '6001a3b716b08100062e4168' } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(lieuxMediationNumerique)
      } as LieuxMediationNumeriqueRepository);

    const structure: LieuMediationNumeriqueDetailsPresentation = await firstValueFrom(
      lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(
        of(new Map<string, string>([['id', '6001a35f16b08100062e415f']]) as unknown as ParamMap),

        new Date('2022-07-22T14:55:00.000Z'),
        of(NO_LOCALISATION)
      )
    );

    expect(structure).toStrictEqual({
      id: '6001a35f16b08100062e415f',
      nom: 'Anonymal',
      adresse: `12 BIS RUE DE LECLERCQ Le patio du bois de l'Aulne 51100 Reims`,
      code_postal: '51100',
      commune: 'reims',
      services: ['Prendre en main un ordinateur', 'Accéder à du matériel']
    } as LieuMediationNumeriqueDetailsPresentation);
  });

  it('should get the opening status of the lieu found when opening hours are specified', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: Adresse({
          commune: 'reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        }),
        services: ['Prendre en main un ordinateur', 'Accéder à du matériel'],
        horaires: 'Mo,Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(lieuxMediationNumerique)
      } as LieuxMediationNumeriqueRepository);

    const structure: LieuMediationNumeriqueDetailsPresentation = await firstValueFrom(
      lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(
        of(new Map<string, string>([['id', '6001a35f16b08100062e415f']]) as unknown as ParamMap),
        new Date('2022-07-22T14:55:00.000Z'),
        of(NO_LOCALISATION)
      )
    );

    expect(structure).toStrictEqual({
      id: '6001a35f16b08100062e415f',
      nom: 'Anonymal',
      adresse: `12 BIS RUE DE LECLERCQ Le patio du bois de l'Aulne 51100 Reims`,
      code_postal: '51100',
      commune: 'reims',
      services: ['Prendre en main un ordinateur', 'Accéder à du matériel'],
      horaires: {
        Lundi: '09h00 - 12h00\n14h00 - 18h30',
        Mardi: 'Fermé',
        Mercredi: 'Fermé',
        Jeudi: 'Fermé',
        Vendredi: '09h00 - 12h00\n14h00 - 18h30',
        Samedi: '08h30 - 12h00',
        Dimanche: 'Fermé'
      },
      status: {
        label: 'Ouvert',
        limite: 'Ferme à 18h30'
      }
    } as LieuMediationNumeriqueDetailsPresentation);
  });

  it('should get the lieu with distance', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: Adresse({
          commune: 'reims',
          code_postal: '51100',
          code_insee: '51454',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: "Le patio du bois de l'Aulne"
        }),
        services: ['Prendre en main un ordinateur', 'Accéder à du matériel'],
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter =
      new LieuxMediationNumeriqueDetailsPresenter({
        getAll$: () => of(lieuxMediationNumerique)
      } as LieuxMediationNumeriqueRepository);

    const structure: LieuMediationNumeriqueDetailsPresentation = await firstValueFrom(
      lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(
        of(new Map<string, string>([['id', '6001a35f16b08100062e415f']]) as unknown as ParamMap),
        new Date('2022-07-22T14:55:00.000Z'),
        of(Localisation({ latitude: 45.7689958, longitude: 4.8343466 }))
      )
    );

    expect(structure).toStrictEqual({
      id: '6001a35f16b08100062e415f',
      nom: 'Anonymal',
      adresse: `12 BIS RUE DE LECLERCQ Le patio du bois de l'Aulne 51100 Reims`,
      code_postal: '51100',
      commune: 'reims',
      services: ['Prendre en main un ordinateur', 'Accéder à du matériel'],
      localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 }),
      distance: 0
    } as LieuMediationNumeriqueDetailsPresentation);
  });
});
