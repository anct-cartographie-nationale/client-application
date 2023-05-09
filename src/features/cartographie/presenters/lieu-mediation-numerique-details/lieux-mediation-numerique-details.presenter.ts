import { ParamMap } from '@angular/router';
import { combineLatest, filter, Observable, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ConditionAcces,
  ConditionsAcces,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  geographicDistance,
  ifAny,
  LieuMediationNumeriqueWithAidants,
  LieuxMediationNumeriqueRepository,
  NO_LOCALISATION,
  openingState,
  parseHoraires
} from '../../../core';
import {
  LieuMediationNumeriqueDetailsPresentation,
  ModaliteAccompagnementPresentation,
  SourcePresentation
} from './lieu-mediation-numerique-details.presentation';

const availableSourcesMap: Map<string, SourcePresentation> = new Map<string, SourcePresentation>([
  [
    'mediation-numerique-conseiller-numerique',
    {
      label: 'Conseillers numérique France Services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-conseiller-numerique-1/',
      detail: "Ces données sont intégrées via l'espace Coop CNFS",
      update_link: 'https://coop.conseiller-numerique.gouv.fr/mes-lieux-activite'
    }
  ],
  [
    'dora',
    {
      label: 'Dora',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numeriques-en-france-disponibles-dans-le-referentiel-de-loffre-dinsertion-publie-par-data-inclusion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F'
    }
  ],
  [
    'france-tiers-lieux',
    {
      label: 'France Tiers-Lieux',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-tiers-lieux/'
    }
  ],
  [
    'hinaura',
    {
      label: 'Hinaura',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-auvergne-rhone-alpes-fournis-par-hinaura/'
    }
  ],
  [
    'france-services',
    {
      label: 'France Services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-services',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.'
    }
  ],
  [
    'angers',
    {
      label: "Ville d'Angers",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-angers/'
    }
  ],
  [
    'assembleurs',
    {
      label: 'Les Assembleurs',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-les-assembleurs/'
    }
  ],
  [
    'cd49',
    {
      label: 'Département du Maine-et-Loire',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-departement-du-maine-et-loire/'
    }
  ],
  [
    'francilin',
    {
      label: "Francil'IN",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-services/'
    }
  ],
  [
    'cd35',
    {
      label: "Département d'Ille-et-Vilaine",
      link: 'https://www.data.gouv.fr/fr/datasets/referentiel-de-loffre-dinsertion-liste-des-structures-et-services-dinsertion/'
    }
  ],
  [
    'cd35',
    {
      label: "Département de l'Ille-et-Vilaine",
      link: 'https://www.data.gouv.fr/fr/datasets/referentiel-de-loffre-dinsertion-liste-des-structures-et-services-dinsertion/'
    }
  ],
  [
    'odspep',
    {
      label: 'ODSPEP',
      link: 'https://www.data.gouv.fr/fr/datasets/referentiel-de-loffre-dinsertion-liste-des-structures-et-services-dinsertion/'
    }
  ]
]);

const conditionsAccesMap: Map<ConditionAcces, string> = new Map<ConditionAcces, string>([
  [ConditionAcces.Gratuit, 'Gratuit'],
  [ConditionAcces.GratuitSousCondition, 'Gratuit sous condition'],
  [ConditionAcces.Payant, 'Payant'],
  [ConditionAcces.AccepteLePassNumerique, 'Accepte le Pass Numérique'],
  [ConditionAcces.Adhesion, 'Adhésion']
]);

const modaliteAccompagnementMap: Map<ModaliteAccompagnement, ModaliteAccompagnementPresentation> = new Map<
  ModaliteAccompagnement,
  ModaliteAccompagnementPresentation
>([
  [
    ModaliteAccompagnement.Seul,
    {
      label: 'Seul',
      icon: 'ri-user-3-line',
      description: "j'ai accès à du materiel et une connexion"
    }
  ],
  [
    ModaliteAccompagnement.AvecDeLAide,
    {
      label: "Avec de l'aide",
      icon: 'ri-group-line',
      description: "je suis accompagné dans l'usage du numérique"
    }
  ],
  [
    ModaliteAccompagnement.AMaPlace,
    {
      label: 'À ma place',
      icon: 'ri-service-line',
      description: 'une personne fait les démarches à ma place'
    }
  ],
  [
    ModaliteAccompagnement.DansUnAtelier,
    {
      label: 'Dans un atelier',
      icon: 'ri-tools-line',
      description: "j'apprends à utiliser le numérique"
    }
  ]
]);

const definedLieuMediationNumeriqueOnly = (
  LieuMediationNumerique: LieuMediationNumerique | undefined
): LieuMediationNumerique is LieuMediationNumerique => LieuMediationNumerique != null;

const toLieuMediationNumeriqueMatchingRouteId = ([LieuMediationNumerique, paramMap]: [LieuMediationNumerique[], ParamMap]):
  | LieuMediationNumerique
  | undefined =>
  LieuMediationNumerique.find(
    (LieuMediationNumerique: LieuMediationNumerique) => LieuMediationNumerique.id === paramMap.get('id')
  );

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  localisation === NO_LOCALISATION || lieuMediationNumerique.localisation == null
    ? undefined
    : geographicDistance(lieuMediationNumerique.localisation, localisation);

const toConditionAccesDetailsPresentation = (conditions_acces?: ConditionsAcces): string | undefined =>
  conditions_acces?.map((conditionsAcces: ConditionAcces) => conditionsAccesMap.get(conditionsAcces)).join(', ');

const keepDefined = (
  modaliteAccompagnement: ModaliteAccompagnementPresentation | undefined
): modaliteAccompagnement is ModaliteAccompagnementPresentation => modaliteAccompagnement != null;

const toModaliteAccompagnementPresentation = (
  modaliteAccompagnement: ModaliteAccompagnement
): ModaliteAccompagnementPresentation | undefined => modaliteAccompagnementMap.get(modaliteAccompagnement);

const toModalitesAccompagnementPresentation = (
  modalitesAccompagnement?: ModalitesAccompagnement
): ModaliteAccompagnementPresentation[] =>
  modalitesAccompagnement?.map(toModaliteAccompagnementPresentation).filter(keepDefined) ?? [];

const notEmpty = (
  modalitesAccompagnementPresentation: ModaliteAccompagnementPresentation[]
): ModaliteAccompagnementPresentation[] | undefined =>
  modalitesAccompagnementPresentation.length > 0 ? modalitesAccompagnementPresentation : undefined;

export class LieuxMediationNumeriqueDetailsPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public getAll$ = this.lieuxMediationNumeriqueRepository.getAll$();

  public lieuMediationNumeriqueFromParams$(
    paramMap$: Observable<ParamMap>,
    date: Date,
    localisation$: Observable<Localisation>
  ): Observable<LieuMediationNumeriqueDetailsPresentation> {
    return combineLatest([this.getAll$, paramMap$]).pipe(
      map(toLieuMediationNumeriqueMatchingRouteId),
      filter(definedLieuMediationNumeriqueOnly),
      withLatestFrom(localisation$),
      map(
        ([lieu, localisation]: [
          LieuMediationNumeriqueWithAidants,
          Localisation
        ]): LieuMediationNumeriqueDetailsPresentation => ({
          id: lieu.id,
          nom: lieu.nom,
          adresse: [
            lieu.adresse.voie,
            lieu.adresse.complement_adresse,
            lieu.adresse.code_postal,
            `${lieu.adresse.commune.charAt(0).toUpperCase()}${lieu.adresse.commune.substring(1).toLowerCase()}`
          ].join(' '),
          commune: lieu.adresse.commune,
          code_postal: lieu.adresse.code_postal,
          services: lieu.services,
          ...ifAny('horaires', parseHoraires(date)(lieu.horaires)),
          ...ifAny('status', openingState(date)(lieu.horaires)),
          ...ifAny('typologies', lieu.typologies?.join(', ')),
          ...ifAny('contact', lieu.contact),
          ...ifAny('presentation', lieu.presentation),
          ...ifAny('date_maj', lieu.date_maj),
          ...ifAny('publics_accueillis', lieu.publics_accueillis),
          ...ifAny('conditions_acces', toConditionAccesDetailsPresentation(lieu.conditions_acces)),
          ...ifAny('labels_nationaux', lieu.labels_nationaux),
          ...ifAny('labels_autres', lieu.labels_autres),
          ...ifAny('modalites_accompagnement', toModalitesAccompagnementPresentation(lieu.modalites_accompagnement), notEmpty),
          ...ifAny('accessibilite', lieu.accessibilite),
          ...ifAny('localisation', lieu.localisation),
          ...ifAny('distance', getDistance(lieu, localisation)),
          ...ifAny('prise_rdv', lieu.prise_rdv),
          ...ifAny('aidants', lieu.aidants),
          ...ifAny('source', availableSourcesMap.get(lieu.source ?? '') ?? undefined)
        })
      )
    );
  }
}
