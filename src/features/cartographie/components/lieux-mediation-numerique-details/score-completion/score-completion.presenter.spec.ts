import { scoreCompletion } from './score-completion.presenter';
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
import { firstValueFrom, of } from 'rxjs';
import { ParamMap } from '@angular/router';
import {
  LieuMediationNumeriqueDetailsPresentation,
  LieuxMediationNumeriqueDetailsPresenter
} from '../../../../cartographie/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../../core/repositories';
import { NO_LOCALISATION } from '../../../../core/models';

describe('score completion presenter', (): void => {
  it('should high score completion', async (): Promise<void> => {
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
          site_web: [Url('https://www.laquincaillerie.tl/')]
        }),
        localisation: Localisation({
          latitude: 43.2555,
          longitude: 1.2555
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

    const scoreCompletionTotal: number = scoreCompletion(structure);

    expect(scoreCompletionTotal).toStrictEqual(80);
  });

  it('should return low score completion', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        id: Id('6001a35f16b08100062e415f'),
        nom: Nom('Anonymal'),
        adresse: Adresse({
          commune: 'reims',
          code_postal: '51100',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        contact: Contact({
          telephone: '+33180059880'
        }),
        localisation: Localisation({
          latitude: 43.2555,
          longitude: 1.2555
        }),
        services: Services([Service.PrendreEnMainUnOrdinateur, Service.AccederADuMateriel]),
        date_maj: new Date('2022-06-02')
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

    const scoreCompletionTotal: number = scoreCompletion(structure);

    expect(scoreCompletionTotal).toStrictEqual(39);
  });
});
