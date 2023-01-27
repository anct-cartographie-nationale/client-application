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
  openingStatus,
  parseHoraires
} from '../../../core';
import {
  LieuMediationNumeriqueDetailsPresentation,
  ModaliteAccompagnementPresentation
} from './lieu-mediation-numerique-details.presentation';

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
          services: lieu.services,
          ...ifAny('horaires', parseHoraires(date)(lieu.horaires)),
          ...ifAny('status', openingStatus(date)(lieu.horaires)),
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
          ...ifAny('source', lieu.source)
        })
      )
    );
  }
}
