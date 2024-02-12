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
import { LieuMediationNumeriqueWithAidants, NO_LOCALISATION } from '../../../core/models';
import { geographicDistance, HorairesPresentation, openingState, parseHoraires } from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { ifAny } from '../../../core/utilities';
import {
  LieuMediationNumeriqueDetailsPresentation,
  ModaliteAccompagnementPresentation,
  SourcePresentation
} from './lieu-mediation-numerique-details.presentation';

const typologieMatchingMap = new Map([
  ['ACI', "Structures porteuses d'ateliers et chantiers d'insertion"],
  ['ACIPHC', "Atelier chantier d'insertion premières heures en chantier"],
  ['AFPA', 'Agence nationale pour la formation professionnelle des adultes'],
  ['AI', 'Associations intermédiaires'],
  ['ASE', "Aide sociale à l'enfance"],
  ['ASSO', 'Associations'],
  ['ASSO_CHOMEUR', 'Associations de chômeurs'],
  ['Autre', 'Autre'],
  ['BIB', 'Bibliothèque / Médiathèque'],
  ['CAARUD', "Centre d'accueil et d'accompagnement à la réduction de risques pour usagers de drogues"],
  ['CADA', "Centres d'accueil de demandeurs d'asile"],
  ['CAF', "Caisses d'allocation familiale"],
  ['CAP_EMPLOI', 'Cap Emploi'],
  ['CAVA', "Centres d'adaptation à la vie active"],
  ['CC', 'Communautés de Commune'],
  ['CCAS', "Centres communaux d'action sociale"],
  ['CCONS', 'Chambres consulaires (CCI, CMA, CA)'],
  ['CD', 'Conseils Départementaux'],
  ['CHRS', "Centres d'hébergement et de réinsertion sociale"],
  ['CHU', "Centres d'hébergement d'urgence"],
  ['CIAS', "Centres intercommunaux d'action sociale"],
  ['CIDFF', "Centres d'information sur les droits des femmes et des familles"],
  ['CITMET', 'Cité des métiers'],
  ['CPH', "Centres provisoires d'hébergement"],
  ['CS', 'Centre social'],
  ['CSAPA', "Centre de soins, d'accompagnement et de prévention en addictologie"],
  ['DEETS', "Directions de l'Economie, de l'Emploi, du Travail et des Solidarités"],
  ['DEPT', 'Services sociaux du Conseil départemental'],
  ['DIPLP', 'Délégation interministérielles à la prévention et à la lutte contre la pauvreté'],
  ['E2C', 'École de la deuxième chance'],
  ['EA', 'Entreprise adaptée'],
  ['EATT', 'Entreprise Adaptée'],
  ['EI', "Entreprises d'insertion"],
  ['EITI', "Entreprises d'insertion par le travail indépendant"],
  ['EPCI', 'Intercommunalité'],
  ['EPIDE', "Établissement pour l'insertion dans l'emploi"],
  ['ESS', "Entreprise de l'Économie Sociale et Solidaire"],
  ['ETTI', "Entreprises de travail temporaire d'insertion"],
  ['FAIS', "Fédérations d'acteurs de l'insertion et de la solidarité"],
  ['GEIQ', "Groupements d'employeurs pour l'insertion et la qualification"],
  ['HUDA', "Hébergement d'urgence pour demandeurs d'asile"],
  ['MDE', "Maison de l'emploi"],
  ['MDEF', "Maison de l'emploi et de la formation"],
  ['MDPH', 'Maison Départementale des Personnes Handicapées'],
  ['MDS', 'Maison Départementale des Solidarités'],
  ['MJC', 'Maison des jeunes et de la culture'],
  ['ML', 'Mission Locale'],
  ['MQ', 'Maison de quartier'],
  ['MSA', 'Mutualité Sociale Agricole'],
  ['MUNI', 'Municipalités'],
  ['OACAS', "Structures agréées Organisme d'accueil communautaire et d'activité solidaire"],
  ['ODC', "Organisation délégataire d'un CD"],
  ['OF', 'Organisme de formations'],
  ['OIL', "Opérateur d'intermédiation locative"],
  ['OPCS', 'Organisation porteuse de la clause sociale'],
  ['PAD', "Point d'Accès au Droit"],
  ['PE', 'Pôle emploi'],
  ['PENSION', 'Pension de famille / résidence accueil'],
  ['PIJ_BIJ', 'Points et bureaux information jeunesse'],
  ['PIMMS', 'Point Information Médiation Multi Services'],
  ['PJJ', 'Protection judiciaire de la jeunesse'],
  ['PLIE', "Plans locaux pour l'insertion et l'emploi"],
  ['PREF', 'Préfecture, Sous-Préfecture'],
  ['PREVENTION', 'Service ou club de prévention'],
  ['REG', 'Région'],
  ['RFS', 'Réseau France Services'],
  ['RS_FJT', 'Résidence sociale / FJT - Foyer de Jeunes Travailleurs'],
  ['SCP', 'Services et clubs de prévention'],
  ['SPIP', "Services pénitentiaires d'insertion et de probation"],
  ['TIERS_LIEUX', 'Tiers lieu & coworking'],
  ['UDAF', "Union Départementale d'Aide aux Familles"]
]);

const availableSourcesMap: Map<string, SourcePresentation> = new Map<string, SourcePresentation>([
  [
    'Aidants Connect',
    {
      label: 'Aidants Connect',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-aidants-connect/',
      detail: "Formulaire d'habilitation Aidants Connect",
      update_link: 'https://aidantsconnect.beta.gouv.fr/habilitation/demandeur/',
      logo: 'aidants-connect'
    }
  ],
  [
    'Angers',
    {
      label: "Ville d'Angers",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-angers/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Bus France Services en Charente',
    {
      label: 'Bus FS en Charente',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-bus-france-services-en-charente/',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.',
      logo: 'fs'
    }
  ],
  [
    'Département de la Charente Maritime',
    {
      label: 'Département de la Charente Maritime',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-charente-maritime/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Conseiller Numerique',
    {
      label: 'Conseiller numérique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-conseiller-numerique-1/',
      detail: "Ces données sont intégrées via l'espace Coop CNFS",
      update_link: 'https://coop.conseiller-numerique.gouv.fr/mes-lieux-activite',
      logo: 'CnFS'
    }
  ],
  [
    'Conumm',
    {
      label: 'Conumm',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-conumm/',
      detail: 'Formulaire Conumm',
      update_link: 'https://framaforms.org/cartographie-des-espaces-de-mediation-numerique-en-pays-de-la-loire-1580983145',
      logo: 'Conumm'
    }
  ],
  [
    'Corse',
    {
      label: 'La Corse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-corse-fournis-par-corse/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Département du Maine-et-Loire',
    {
      label: 'Département du Maine-et-Loire',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-departement-du-maine-et-loire/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Dora',
    {
      label: 'Dora',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numeriques-en-france-disponibles-dans-le-referentiel-de-loffre-dinsertion-publie-par-data-inclusion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Epernay',
    {
      label: 'Epernay',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-marne-fournis-par-epernay/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Etapes Numerique',
    {
      label: 'Etapes Numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-etapes-numerique/',
      detail: 'Données gérées par La Poste et la Banque des Territoires',
      update_link: '',
      logo: 'etapes-num'
    }
  ],
  [
    'Fibre 64',
    {
      label: 'Fibre 64',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-pyrenees-atlantique-fournis-par-fibre-64-3',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'France Services',
    {
      label: 'France Services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-services',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.',
      logo: 'fs'
    }
  ],
  [
    'France tiers-lieux',
    {
      label: 'France Tiers-Lieux',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-tiers-lieux/',
      detail: 'Cartographie des tiers-lieux',
      update_link: 'https://cartographie.francetierslieux.fr/',
      logo: 'france-tiers-lieux'
    }
  ],
  [
    'Francil-in',
    {
      label: "Francil'IN",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-ile-de-france-fournis-par-francil-in/',
      detail: "Formulaire Francil'In",
      update_link: 'https://equipe752106.typeform.com/to/qTKCmDOf?typeform-source=carto.francilin.fr',
      logo: 'francilin'
    }
  ],
  [
    'Gironde',
    {
      label: 'Département de la Gironde',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-gironde/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Haute-Vienne',
    {
      label: 'Département de la Haute-Vienne',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-haute-vienne/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Hinaura',
    {
      label: 'Hinaura',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-auvergne-rhone-alpes-fournis-par-hinaura/',
      detail: 'Formulaire Hinaura',
      update_link: 'https://carto.hinaura.fr/?CommentModif',
      logo: 'hinaura'
    }
  ],
  [
    'Hub-lo',
    {
      label: 'Hub-lo',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-centre-val-de-loire-fournis-par-hub-lo-1/',
      detail: 'Plateforme Hub-lo Centre Val-de-Loire',
      update_link: 'https://medrcvl.doterr.fr/inscription',
      logo: 'hub-lo'
    }
  ],
  [
    'La Creuse',
    {
      label: 'Département de la Creuse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-la-creuse/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Les Assembleurs',
    {
      label: 'Les Assembleurs',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-les-assembleurs/',
      detail: 'Formulaire des Assembleurs',
      update_link: 'https://solen1.enquetes.social.gouv.fr/cgi-9/HE/SF?P=76z14z2z-1z-1z2747C6FAAF',
      logo: 'assembleurs'
    }
  ],
  [
    'Les Landes',
    {
      label: 'Département des Landes',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-les-landes/',
      detail: "Plateforme d'échange de données en Nouvelle-Aquitaine",
      update_link: 'https://www.pigma.org/onegeo-login/fr/signin/?next=%2Fonegeo-maps%2F',
      logo: 'les-landes'
    }
  ],
  [
    'Loire Atlantique',
    {
      label: 'Département de la Loire-Atlantique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-loire-atlantique-fournis-par-loire-atlantique-1/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Mednum BFC',
    {
      label: 'Mednum BFC',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-bourgogne-franche-comte-fournis-par-mednum-bfc/',
      detail: 'Formulaire de la Mednum BFC',
      update_link: 'https://www.mednum-bfc.fr/maj-lieu/',
      logo: 'mednum-bfc'
    }
  ],
  [
    'Mulhouse',
    {
      label: 'Ville de Mulhouse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-haut-rhin-fournis-par-mulhouse/',
      detail: 'Open data M2a',
      update_link: 'https://data.mulhouse-alsace.fr/pages/accueil/',
      logo: 'mulhouse'
    }
  ],
  [
    'Paca',
    {
      label: 'Région PACA',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-provence-alpes-cote-dazur-fournis-par-paca/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    }
  ],
  [
    'Res-in',
    {
      label: 'Rés-in',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-lyon-fournis-par-res-in/',
      detail: "Plateforme Rés'in",
      update_link: 'https://resin.grandlyon.com/acteurs',
      logo: 'resin'
    }
  ],
  [
    'RhinOcc',
    {
      label: 'RhinOcc',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-occitanie-fournis-par-rhinocc/',
      detail: 'Formulaire RhinOcc',
      update_link: 'https://rhinocc.fr/recensement/',
      logo: 'rhinocc'
    }
  ],
  [
    'Ultra-numerique',
    {
      label: 'Ultra-numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-la-reunion-fournis-par-ultra-numerique/',
      detail: 'Plateforme Ultra Numerique',
      update_link: 'https://reunion.ultranumerique.fr/',
      logo: 'ultra-numerique'
    }
  ],
  [
    'Vendée',
    {
      label: 'Département de la Vendée',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-vendee-fournis-par-vendee/',
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
      icon: 'ri-user-fill',
      description: "j'ai accès à du materiel et une connexion"
    }
  ],
  [
    ModaliteAccompagnement.AvecDeLAide,
    {
      label: "Avec de l'aide",
      icon: 'ri-group-fill',
      description: "je suis accompagné dans l'usage du numérique"
    }
  ],
  [
    ModaliteAccompagnement.AMaPlace,
    {
      label: 'À ma place',
      icon: 'ri-service-fill',
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

const getHorairesWeeksByWeeks =
  (date: Date) =>
  (horaires: string): HorairesPresentation[] => {
    return Array(5)
      .fill(null)
      .map((_, i) => parseHoraires(new Date(date.getTime() + i * 7 * 24 * 60 * 60 * 1000))(horaires))
      .filter((horaires): horaires is HorairesPresentation => horaires != null)
      .slice(1);
  };

const ifAnyHorairesWithWeeks =
  (date: Date) =>
  (horaires?: string): HorairesPresentation[] | {} =>
    horaires?.includes('week') ? ifAny('full_horaires', getHorairesWeeksByWeeks(date)(horaires)) : [];

const getMultipleSourcesIfAny = (id: string, lieuSource?: string): SourcePresentation[] =>
  id.includes('__')
    ? Array.from(availableSourcesMap)
        .filter(([source]: [string, SourcePresentation]) => id.replace(/-/g, ' ').includes(source))
        .map(([, source]) => source)
    : [availableSourcesMap.get(lieuSource ?? '') ?? []].flat();

const getSourcesIfAny = (id: string, lieuSource?: string): SourcePresentation[] | undefined =>
  lieuSource ? getMultipleSourcesIfAny(id, lieuSource) : undefined;

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
          ...ifAnyHorairesWithWeeks(date)(lieu.horaires),
          ...ifAny('status', openingState(date)(lieu.horaires)),
          ...ifAny('typologies', lieu.typologies?.map((typologie) => typologieMatchingMap.get(typologie) || '').join(', ')),
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
          ...ifAny('source', getSourcesIfAny(lieu.id, lieu.source ?? '')),
          ...ifAny('prive', lieu.prive)
        })
      )
    );
  }
}
