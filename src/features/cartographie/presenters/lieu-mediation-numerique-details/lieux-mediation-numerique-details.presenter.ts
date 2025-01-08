import { ParamMap } from '@angular/router';
import { combineLatest, filter, Observable, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Itinerance,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueWithAidants, NO_LOCALISATION } from '../../../core/models';
import { geographicDistance, HorairesPresentation, onlyDefined, openingState, parseHoraires } from '../../../core/presenters';
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

type SourcePresentationCallback = (id: string) => SourcePresentation;

const availableSourcesMap: Map<string, SourcePresentationCallback> = new Map<string, SourcePresentationCallback>([
  [
    'Aidants-Connect',
    (_: string) => ({
      label: 'Aidants Connect',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-aidants-connect/',
      detail: "Formulaire d'habilitation Aidants Connect",
      update_link: 'https://aidantsconnect.beta.gouv.fr/accounts/login/',
      logo: 'aidants-connect'
    })
  ],
  [
    'Mairie-Aix-en-Provence',
    (_: string) => ({
      label: 'Ville Aix en Provence',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-bouches-du-rhone-fournis-par-mairie-aix-en-provence/',
      detail: "Ces données sont intégrées via l'outil DORA",
      logo: ''
    })
  ],
  [
    'Angers',
    (_: string) => ({
      label: "Ville d'Angers",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-angers/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Bus-France-Services-en-Charente',
    (_: string) => ({
      label: 'Bus FS en Charente',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-bus-france-services-en-charente/',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.',
      logo: 'fs'
    })
  ],
  [
    'Conseiller-Numerique',
    (_: string) => ({
      label: 'Conseiller numérique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-conseiller-numerique-1/',
      detail: "Ces données sont intégrées via l'espace Coop CNFS",
      update_link: 'https://coop.conseiller-numerique.gouv.fr/mes-lieux-activite',
      logo: 'CnFS'
    })
  ],
  [
    'Conumm',
    (_: string) => ({
      label: 'Conumm',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-conumm/',
      detail: 'Formulaire Conumm',
      update_link: 'https://framaforms.org/cartographie-des-espaces-de-mediation-numerique-en-pays-de-la-loire-1580983145',
      logo: 'Conumm'
    })
  ],
  [
    'Corse',
    (_: string) => ({
      label: 'La Corse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-corse-fournis-par-corse/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Département-du-Maine-et-Loire',
    (_: string) => ({
      label: 'Département du Maine-et-Loire',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-maine-et-loire-fournis-par-departement-du-maine-et-loire/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'dora',
    (id: string) => ({
      label: 'Dora',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numeriques-en-france-disponibles-dans-le-referentiel-de-loffre-dinsertion-publie-par-data-inclusion/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora',
      origin: {
        api: `https://api.data.inclusion.beta.gouv.fr/api/v0/structures/dora/${id}`,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjLmdhdmFuaWVyQGJldGEuZ291di5mciIsImFkbWluIjpmYWxzZX0.vd5hs4vraX6kSc6mQz98nFdrJgDw-3B6Gk-8UzoWNO4'
      }
    })
  ],
  [
    'Epernay',
    (_: string) => ({
      label: 'Epernay',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-marne-fournis-par-epernay/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Etapes-Numerique',
    (_: string) => ({
      label: 'Etapes Numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-etapes-numerique/',
      detail: 'Données gérées par La Poste et la Banque des Territoires',
      update_link: '',
      logo: 'etapes-num'
    })
  ],
  [
    'Fibre-64',
    (_: string) => ({
      label: 'Fibre 64',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-pyrenees-atlantique-fournis-par-fibre-64-3',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'France-Services',
    (_: string) => ({
      label: 'France Services',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-services',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.',
      logo: 'fs'
    })
  ],
  [
    'France-tiers-lieux',
    (_: string) => ({
      label: 'France Tiers-Lieux',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-france-tiers-lieux/',
      detail: 'Cartographie des tiers-lieux',
      update_link: 'https://cartographie.francetierslieux.fr/',
      logo: 'france-tiers-lieux'
    })
  ],
  [
    'Francil-in',
    (_: string) => ({
      label: "Francil'IN",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-ile-de-france-fournis-par-francil-in/',
      detail: "Formulaire Francil'In",
      update_link: 'https://equipe752106.typeform.com/to/qTKCmDOf?typeform-source=carto.francilin.fr',
      logo: 'francilin'
    })
  ],
  [
    'Gironde',
    (_: string) => ({
      label: 'Département de la Gironde',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-gironde/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Haute-Vienne',
    (_: string) => ({
      label: 'Département de la Haute-Vienne',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-haute-vienne/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Hinaura',
    (_: string) => ({
      label: 'Hinaura',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-auvergne-rhone-alpes-fournis-par-hinaura/',
      detail: 'Formulaire Hinaura',
      update_link: 'https://carto.hinaura.fr/?CommentModif',
      logo: 'hinaura'
    })
  ],
  [
    'Hub-lo',
    (_: string) => ({
      label: 'Hub-lo',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-centre-val-de-loire-fournis-par-hub-lo-1/',
      detail: 'Plateforme Hub-lo Centre Val-de-Loire',
      update_link: 'https://medrcvl.doterr.fr/inscription',
      logo: 'hub-lo'
    })
  ],
  [
    'La-Creuse',
    (_: string) => ({
      label: 'Département de la Creuse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-la-creuse/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Le-Havre',
    (_: string) => ({
      label: 'Ville du Havre',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-le-havre-fournis-par-le-havre/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Les-Assembleurs',
    (_: string) => ({
      label: 'Les Assembleurs',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-les-assembleurs/',
      detail: 'Formulaire des Assembleurs',
      update_link: 'https://solen1.enquetes.social.gouv.fr/cgi-9/HE/SF?P=76z14z2z-1z-1z2747C6FAAF',
      logo: 'assembleurs'
    })
  ],
  [
    'Les-Landes',
    (_: string) => ({
      label: 'Département des Landes',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-nouvelle-aquitaine-fournis-par-les-landes/',
      detail: "Plateforme d'échange de données en Nouvelle-Aquitaine",
      update_link: 'https://www.pigma.org/onegeo-login/fr/signin/?next=%2Fonegeo-maps%2F',
      logo: 'les-landes'
    })
  ],
  [
    'Loire-Atlantique',
    (_: string) => ({
      label: 'Département de la Loire-Atlantique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-loire-atlantique-fournis-par-loire-atlantique-1/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Mednum-BFC',
    (_: string) => ({
      label: 'Mednum BFC',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-bourgogne-franche-comte-fournis-par-mednum-bfc/',
      detail: 'Formulaire de la Mednum BFC',
      update_link: 'https://www.mednum-bfc.fr/maj-lieu/',
      logo: 'mednum-bfc'
    })
  ],
  [
    'Mulhouse',
    (_: string) => ({
      label: 'Ville de Mulhouse',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-haut-rhin-fournis-par-mulhouse/',
      detail: 'Open data M2a',
      update_link: 'https://data.mulhouse-alsace.fr/pages/accueil/',
      logo: 'mulhouse'
    })
  ],
  [
    'Paca',
    (_: string) => ({
      label: 'Région PACA',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-provence-alpes-cote-dazur-fournis-par-paca/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ],
  [
    'Res-in',
    (_: string) => ({
      label: 'Rés-in',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-lyon-fournis-par-res-in/',
      detail: "Plateforme Rés'in",
      update_link: 'https://resin.grandlyon.com/acteurs',
      logo: 'resin'
    })
  ],
  [
    'Siilab',
    (_: string) => ({
      label: 'Siilab',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-hauts-de-france-fournis-par-siilab/',
      detail: 'Formulaire Siilab',
      update_link: 'https://solen1.enquetes.social.gouv.fr/cgi-3/HE/SF?P=76z14z2z-1z-1z2747C6FAAF',
      logo: 'siilab'
    })
  ],
  [
    'RhinOcc',
    (_: string) => ({
      label: 'RhinOcc',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-occitanie-fournis-par-rhinocc/',
      detail: 'Formulaire RhinOcc',
      update_link: 'https://rhinocc.fr/recensement/',
      logo: 'rhinocc'
    })
  ],
  [
    'Ultra-numerique',
    (_: string) => ({
      label: 'Ultra-numerique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-la-reunion-fournis-par-ultra-numerique/',
      detail: 'Plateforme Ultra Numerique',
      update_link: 'https://reunion.ultranumerique.fr/',
      logo: 'ultra-numerique'
    })
  ],
  [
    'Vendée',
    (_: string) => ({
      label: 'Département de la Vendée',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-vendee-fournis-par-vendee/',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora'
    })
  ]
]);

const modaliteAccompagnementMap: Map<ModaliteAccompagnement, ModaliteAccompagnementPresentation> = new Map<
  ModaliteAccompagnement,
  ModaliteAccompagnementPresentation
>([
  [
    ModaliteAccompagnement.EnAutonomie,
    {
      label: 'Seul',
      icon: 'ri-user-fill',
      description: "J'ai accès à du matériel et une connexion"
    }
  ],
  [
    ModaliteAccompagnement.AccompagnementIndividuel,
    {
      label: "Avec de l'aide",
      icon: 'ri-group-fill',
      description: "Je suis accompagné dans l'usage du numérique"
    }
  ],
  [
    ModaliteAccompagnement.DansUnAtelier,
    {
      label: 'Dans un atelier',
      icon: 'ri-slideshow-2-fill',
      description: "J'apprends à utiliser le numérique"
    }
  ],
  [
    ModaliteAccompagnement.ADistance,
    {
      label: 'À distance',
      icon: 'ri-customer-service-fill',
      description: 'Je suis accompagné au téléphone ou en ligne'
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

const toSingleSource = (sources: SourcePresentation[], source: SourcePresentation): SourcePresentation[] =>
  sources.find((s) => s.label === source.label) ? sources : [...sources, source];

const getMergedSources = (id: string): SourcePresentation[] =>
  id
    .split('__')
    .map((id: string): SourcePresentation | undefined => {
      const [source, originalId] = id.split('_');
      return availableSourcesMap.get(source)?.(originalId);
    })
    .filter(onlyDefined)
    .reduce(toSingleSource, []);

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
          ...ifAny('itinerance', lieu.itinerance?.includes(Itinerance.Itinerant)),
          ...ifAny('modalites_acces', lieu.modalites_acces),
          ...ifAny('publics_specifiquement_adresses', lieu.publics_specifiquement_adresses),
          ...ifAny('prise_en_charge_specifique', lieu.prise_en_charge_specifique),
          ...ifAny('frais_a_charge', lieu.frais_a_charge),
          ...ifAny('dispositif_programmes_nationaux', lieu.dispositif_programmes_nationaux),
          ...ifAny('formations_labels', lieu.formations_labels),
          ...ifAny('autres_formations_labels', lieu.autres_formations_labels),
          ...ifAny('modalites_accompagnement', toModalitesAccompagnementPresentation(lieu.modalites_accompagnement), notEmpty),
          ...ifAny('fiche_acces_libre', lieu.fiche_acces_libre),
          ...ifAny('localisation', lieu.localisation),
          ...ifAny('distance', getDistance(lieu, localisation)),
          ...ifAny('prise_rdv', lieu.prise_rdv),
          ...ifAny('aidants', lieu.aidants),
          ...ifAny('source', getMergedSources(lieu.id)),
          ...ifAny('prive', lieu.prive)
        })
      )
    );
  }
}
