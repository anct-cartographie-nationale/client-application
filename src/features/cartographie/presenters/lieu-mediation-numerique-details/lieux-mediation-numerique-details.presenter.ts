import { ParamMap } from '@angular/router';
import { combineLatest, filter, firstValueFrom, Observable, of, withLatestFrom } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  ConditionAcces,
  ConditionsAcces,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueWithAidants, NO_LOCALISATION } from '../../../core/models';
import { geographicDistance, openingState, parseHoraires } from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { ifAny } from '../../../core/utilities';
import {
  Erp,
  ErpReponse,
  LieuMediationNumeriqueDetailsPresentation,
  ModaliteAccompagnementPresentation,
  SourcePresentation
} from './lieu-mediation-numerique-details.presentation';
import { HttpClient, HttpParams } from '@angular/common/http';

const accesLibreHeaders = {
  accept: 'application/json',
  'X-CSRFToken': 'MYo0jyUL4CdMAD9MJdWhIZmjkKVbuCZDphYa8TQicgogpSR5w9BwvMuCW9HoP5Ve',
  Authorization: 'Api-Key DqA6JsmH.vnSuxUL8eDfTARBv8f138CC2ubLBX9A1'
};

const availableSourcesMap: Map<string, SourcePresentation> = new Map<string, SourcePresentation>([
  [
    'conseiller-numerique',
    {
      label: 'Conseillers numérique France Services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-conseiller-numerique-1/',
      detail: "Ces données sont intégrées via l'espace Coop CNFS",
      update_link: 'https://coop.conseiller-numerique.gouv.fr/mes-lieux-activite',
      logo: 'CnFS'
    }
  ],
  [
    'dora',
    {
      label: 'Dora',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numeriques-en-france-disponibles-dans-le-referentiel-de-loffre-dinsertion-publie-par-data-inclusion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'france-tiers-lieux',
    {
      label: 'France Tiers-Lieux',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-tiers-lieux/',
      detail: 'Cartographie des tiers-lieux',
      update_link: 'https://cartographie.francetierslieux.fr/',
      logo: 'france-tiers-lieux'
    }
  ],
  [
    'hinaura',
    {
      label: 'Hinaura',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-auvergne-rhone-alpes-fournis-par-hinaura/',
      detail: 'Formulaire Hinaura',
      update_link: 'https://carto.hinaura.fr/?CommentModif',
      logo: 'hinaura'
    }
  ],
  [
    'france-services',
    {
      label: 'France Services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-services',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.',
      logo: 'fs'
    }
  ],
  [
    'angers',
    {
      label: "Ville d'Angers",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-angers/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'assembleurs',
    {
      label: 'Les Assembleurs',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-les-assembleurs/',
      detail: 'Formulaire des Assembleurs',
      update_link: 'https://solen1.enquetes.social.gouv.fr/cgi-9/HE/SF?P=76z14z2z-1z-1z2747C6FAAF',
      logo: 'assembleurs'
    }
  ],
  [
    'cd49',
    {
      label: 'Département du Maine-et-Loire',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-departement-du-maine-et-loire/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'francilin',
    {
      label: "Francil'IN",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-ile-de-france-fournis-par-francil-in/',
      detail: "Formulaire Francil'In",
      update_link: 'https://equipe752106.typeform.com/to/qTKCmDOf?typeform-source=carto.francilin.fr',
      logo: 'francilin'
    }
  ],
  [
    'cd35',
    {
      label: "Département d'Ille-et-Vilaine",
      link: 'https://www.data.gouv.fr/fr/datasets/referentiel-de-loffre-dinsertion-liste-des-structures-et-services-dinsertion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'cd35',
    {
      label: "Département de l'Ille-et-Vilaine",
      link: 'https://www.data.gouv.fr/fr/datasets/referentiel-de-loffre-dinsertion-liste-des-structures-et-services-dinsertion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'odspep',
    {
      label: 'ODSPEP',
      link: 'https://www.data.gouv.fr/fr/datasets/referentiel-de-loffre-dinsertion-liste-des-structures-et-services-dinsertion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'rhinocc',
    {
      label: 'RhinOcc',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-occitanie-fournis-par-rhinocc/',
      detail: 'Formulaire RhinOcc',
      update_link: 'https://rhinocc.fr/recensement/',
      logo: 'rhinocc'
    }
  ],
  [
    'mulhouse',
    {
      label: 'Mulhouse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-haut-rhin-fournis-par-mulhouse/',
      detail: 'Open data M2a',
      update_link: 'https://data.mulhouse-alsace.fr/pages/accueil/',
      logo: 'mulhouse'
    }
  ],
  [
    'cr93',
    {
      label: 'Paca',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-provence-alpes-cote-dazur-fournis-par-paca/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'numi',
    {
      label: 'Numi',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-normandie-fournis-par-numi/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'cd44',
    {
      label: 'Loire Atlantique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-loire-atlantique-fournis-par-loire-atlantique-1/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'cd40',
    {
      label: 'Les Landes',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-les-landes/',
      detail: "Plateforme d'échange de données en Nouvelle-Aquitaine",
      update_link: 'https://www.pigma.org/onegeo-login/fr/signin/?next=%2Fonegeo-maps%2F',
      logo: 'les-landes'
    }
  ],
  [
    'res-in',
    {
      label: 'Res-in',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-lyon-fournis-par-res-in/',
      detail: "Plateforme Res'in",
      update_link: 'https://resin.grandlyon.com/acteurs',
      logo: 'resin'
    }
  ],
  [
    'ultra-numerique',
    {
      label: 'Ultra-numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-la-reunion-fournis-par-ultra-numerique/',
      detail: 'Plateforme Ultra Numerique',
      update_link: 'https://reunion.ultranumerique.fr/',
      logo: 'ultra-numerique'
    }
  ],
  [
    'mednum-hub-antilles',
    {
      label: 'Mednum-Hub-Antilles',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-martinique-fournis-par-mednum-hub-antilles-4/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'etapes numerique',
    {
      label: 'Etapes Numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-etapes-numerique/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'cd49',
    {
      label: 'Département du Maine-et-Loire',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-departement-du-maine-et-loire/',
      detail: 'Plateforme open data du Maine et Loire',
      update_link: 'https://data.maine-et-loire.fr/pages/demarche/',
      logo: 'maine-et-loire'
    }
  ],
  [
    'cd87',
    {
      label: 'Haute-Vienne',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-haute-vienne/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'cd23',
    {
      label: 'La Creuse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-la-creuse/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'hub-lo',
    {
      label: 'Hub-lo',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-centre-val-de-loire-fournis-par-hub-lo-1/',
      detail: 'Plateforme Hub-lo Centre Val-de-Loire',
      update_link: 'https://medrcvl.doterr.fr/inscription',
      logo: 'hub-lo'
    }
  ],
  [
    'cd33',
    {
      label: 'Gironde',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-gironde/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
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
  public constructor(
    private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository,
    private readonly httpClient?: HttpClient
  ) {}

  public getAll$ = this.lieuxMediationNumeriqueRepository.getAll$();

  public getAccessibiliteFromAccesLibre = async (
    lieu: string,
    commune: string,
    code_postal: string,
    localisation?: Localisation
  ): Promise<string | undefined> => {
    let params = new HttpParams().set('commune', commune).set('code_postal', code_postal);

    if (localisation) {
      params = params.set('around', `${localisation.latitude},${localisation.longitude}`);
    }

    const response$ = this.httpClient
      ?.get<ErpReponse>('https://acceslibre.beta.gouv.fr/api/erps/', {
        params: params,
        headers: accesLibreHeaders
      })
      .pipe(
        map((response) => {
          const erp = response.results.find((erp: Erp) => lieu.includes(erp['nom'] as string));
          return erp ? erp['web_url'] : null;
        }),
        catchError((_) => {
          return of(null);
        })
      );

    return response$ ? (await firstValueFrom(response$)) ?? undefined : undefined;
  };

  public accessibiliteIfAny = async (
    lieu: string,
    commune: string,
    code_postal: string,
    accessibilite?: string,
    localisation?: Localisation
  ): Promise<string | undefined> =>
    accessibilite != null ? accessibilite : await this.getAccessibiliteFromAccesLibre(lieu, commune, code_postal, localisation);

  public lieuMediationNumeriqueFromParams$(
    paramMap$: Observable<ParamMap>,
    date: Date,
    localisation$: Observable<Localisation>
  ): Observable<LieuMediationNumeriqueDetailsPresentation> {
    return combineLatest([this.getAll$, paramMap$]).pipe(
      map(toLieuMediationNumeriqueMatchingRouteId),
      filter(definedLieuMediationNumeriqueOnly),
      withLatestFrom(localisation$),
      mergeMap(
        async ([lieu, localisation]: [
          LieuMediationNumeriqueWithAidants,
          Localisation
        ]): Promise<LieuMediationNumeriqueDetailsPresentation> => {
          const accessibilite: string | undefined = await this.accessibiliteIfAny(
            lieu.nom,
            lieu.adresse.commune,
            lieu.adresse.code_postal,
            lieu.accessibilite,
            lieu.localisation
          );
          return {
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
            ...ifAny(
              'modalites_accompagnement',
              toModalitesAccompagnementPresentation(lieu.modalites_accompagnement),
              notEmpty
            ),
            ...ifAny('accessibilite', accessibilite),
            ...ifAny('localisation', lieu.localisation),
            ...ifAny('distance', getDistance(lieu, localisation)),
            ...ifAny('prise_rdv', lieu.prise_rdv),
            ...ifAny('aidants', lieu.aidants),
            ...ifAny('source', availableSourcesMap.get(lieu.source ?? '') ?? undefined)
          };
        }
      )
    );
  }
}
