import { ParamMap } from '@angular/router';
import { combineLatest, filter, Observable, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Itinerance,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  Typologie
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

const typologieValue: Record<Typologie, string> = {
  ACI: "Structures porteuses d'ateliers et chantiers d'insertion",
  ACIPHC: "Atelier chantier d'insertion premières heures en chantier",
  AFPA: 'Agence nationale pour la formation professionnelle des adultes',
  AI: 'Associations intermédiaires',
  ASE: "Aide sociale à l'enfance",
  ASSO: 'Associations',
  ASSO_CHOMEUR: 'Associations de chômeurs',
  AVIP: "À vocation d'insertion professionnelle",
  Autre: 'Autre',
  BIB: 'Bibliothèque / Médiathèque',
  CAARUD: "Centre d'accueil et d'accompagnement à la réduction de risques pour usagers de drogues",
  CADA: "Centres d'accueil de demandeurs d'asile",
  CAF: "Caisses d'allocation familial",
  CAP_EMPLOI: 'Cap Emploi',
  CAVA: "Centres d'adaptation à la vie active",
  CC: 'Communautés de Commune',
  CCAS: "Centres communaux d'action sociale",
  CCONS: 'Chambres consulaires (CCI, CMA, CA)',
  CD: 'Conseils Départementaux',
  CDAS: "Centre départemental d'action sociale",
  CFP: 'Centre des finances publiques',
  CHRS: "Centres d'hébergement et de réinsertion sociale",
  CHU: "Centres d'hébergement d'urgence",
  CIAS: "Centres intercommunaux d'action sociale",
  CIDFF: "Centres d'information sur les droits des femmes et des familles",
  CITMET: 'Cité des métiers',
  CMP: 'Centre Médico Psychologique',
  CMS: 'Centre médico-social',
  CPAM: "Caisse primaire d'assurance maladie",
  CPH: "Centres provisoires d'hébergement",
  CS: 'Centre social',
  CSAPA: "Centre de soins, d'accompagnement et de prévention en addictologie",
  CSC: 'Centre socioculturel',
  DEETS: "Directions de l'Economie, de l'Emploi, du Travail et des Solidarités",
  DEPT: 'Services sociaux du Conseil départemental',
  DIPLP: 'Délégation interministérielles à la prévention et à la lutte contre la pauvreté',
  E2C: 'École de la deuxième chance',
  EA: 'Entreprise adaptée',
  EATT: 'Entreprise Adaptée',
  EI: "Entreprises d'insertion",
  EITI: "Entreprises d'insertion par le travail indépendant",
  ENM: 'Espace Numérique Mobile',
  EPCI: 'Intercommunalité',
  EPI: 'Espace Public Internet',
  EPIDE: "Établissement pour l'insertion dans l'emploi",
  EPN: 'Espace publique numérique',
  ES: 'Épicerie solidaire',
  ESAT: "Établissements ou services d'aide par le travail",
  ESS: "Entreprise de l'Économie Sociale et Solidaire",
  ETTI: "Entreprises de travail temporaire d'insertion",
  EVS: 'Espace de vie sociale',
  FABLAB: 'Fablab',
  FABRIQUE: 'Fabrique',
  FAIS: "Fédérations d'acteurs de l'insertion et de la solidarité",
  FT: 'France travail',
  GEIQ: "Groupements d'employeurs pour l'insertion et la qualification",
  HUDA: "Hébergement d'urgence pour demandeurs d'asile",
  LA_POSTE: 'La Poste',
  MDE: "Maison de l'emploi",
  MDEF: "Maison de l'emploi et de la formation",
  MDH: 'Maison des Habitants',
  MDPH: 'Maison Départementale des Personnes Handicapées',
  MDS: 'Maison Départementale des Solidarités',
  MJC: 'Maison des jeunes et de la culture',
  ML: 'Mission Locale',
  MQ: 'Maison de quartier',
  MSA: 'Mutualité Sociale Agricole',
  MSAP: 'Maison de Services Au Public',
  MUNI: 'Municipalités',
  OACAS: "Structures agréées Organisme d'accueil communautaire et d'activité solidaire",
  ODC: "Organisation délégataire d'un CD",
  OF: 'Organisme de formations',
  OIL: "Opérateur d'intermédiation locative",
  OPCS: 'Organisation porteuse de la clause sociale',
  PAD: "Point d'Accès au Droit",
  PENSION: 'Pension de famille / résidence accueil',
  PI: 'Point info',
  PIJ_BIJ: 'Points et bureaux information jeunesse',
  PIMMS: 'Pimms Médiation',
  PJJ: 'Protection judiciaire de la jeunesse',
  PLIE: "Plans locaux pour l'insertion et l'emploi",
  PREF: 'Préfecture, Sous-Préfecture',
  PREVENTION: 'Service ou club de prévention',
  REG: 'Région',
  RELAIS_LECTURE: 'Relais lecture',
  RESSOURCERIE: 'Ressourcerie',
  RFS: 'Réseau France Services',
  RS_FJT: 'Résidence sociale / FJT - Foyer de Jeunes Travailleurs',
  SCP: 'Services et clubs de prévention',
  SPIP: "Services pénitentiaires d'insertion et de probation",
  TIERS_LIEUX: 'Tiers lieu & coworking',
  UDAF: "Union Départementale d'Aide aux Familles"
};

type SourcePresentationCallback = (id: string) => SourcePresentation;

const availableSourcesMap: Map<string, SourcePresentationCallback> = new Map<string, SourcePresentationCallback>([
  [
    'Département-de-la-Charente-Maritime',
    (_: string) => ({
      label: 'Département de la Charente-Maritime',
      link: 'https://www.data.gouv.fr/fr/datasets/r/a409cbb5-cc2e-4f63-bed4-27fcc1777379',
      detail: "Connectez sur geo plateforme 17 pour mettre à jour la carte des dispositifs d'inclusion numérique",
      update_link: 'https://publiclic.geoplateforme17.fr/index.php/accueil/se-connecter-in',
      logo: 'charente-maritime'
    })
  ],
  [
    'Conseiller-Numerique',
    (_: string) => ({
      label: 'Conseiller numérique',
      link: 'https://www.conseiller-numerique.gouv.fr',
      logo: 'CnFS'
    })
  ],
  [
    'Coop-numérique',
    (_: string) => ({
      label: 'Coop numérique',
      link: 'https://coop-numerique.anct.gouv.fr',
      detail: 'Ces données sont intégrées via la Coop de la médiation numérique',
      update_link: 'https://coop-numerique.anct.gouv.fr/connexion',
      logo: 'coop'
    })
  ],
  [
    'dora',
    (id: string) => ({
      label: 'Dora',
      link: 'https://dora.inclusion.beta.gouv.fr',
      detail: "Ces données sont intégrées via l'outil DORA",
      update_link: 'https://dora.inclusion.beta.gouv.fr/auth/connexion?next=%2F',
      logo: 'dora',
      origin: {
        api: `https://api.data.inclusion.gouv.fr/api/v0/services/dora/${id}`,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjLmdhdmFuaWVyQGJldGEuZ291di5mciIsImFkbWluIjpmYWxzZX0.vd5hs4vraX6kSc6mQz98nFdrJgDw-3B6Gk-8UzoWNO4'
      }
    })
  ],
  [
    'France-Services',
    (_: string) => ({
      label: 'France Services',
      link: 'https://www.france-services.gouv.fr/',
      detail:
        'Les horaires et coordonnées de votre France services doivent être actualisés directement depuis l’onglet « Ma structure » de la Plateforme France services. Pour tout autre changement, veuillez-vous rapprocher de votre référent départemental.',
      logo: 'fs'
    })
  ],
  [
    'Francil-in',
    (_: string) => ({
      label: "Francil'IN",
      link: 'https://carto.francilin.fr/map',
      detail: "Formulaire Francil'In",
      update_link: 'https://form.typeform.com/to/qTKCmDOf?typeform-source=equipe752106.typeform.com',
      logo: 'francilin'
    })
  ],
  [
    'france-travail',
    (id: string) => ({
      label: 'France Travail',
      link: 'https://data.inclusion.gouv.fr/acceder-aux-donnees/',
      detail: 'Ces données sont fournies par France Travail via data·inclusion',
      logo: 'france-travail',
      origin: {
        api: `https://api.data.inclusion.gouv.fr/api/v0/services/france-travail/${id.split('-').slice(2).join('-')}`,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjLmdhdmFuaWVyQGJldGEuZ291di5mciIsImFkbWluIjpmYWxzZX0.vd5hs4vraX6kSc6mQz98nFdrJgDw-3B6Gk-8UzoWNO4'
      }
    })
  ],
  [
    'fredo',
    (id: string) => ({
      label: 'Fredo',
      link: 'https://data.inclusion.gouv.fr/acceder-aux-donnees/',
      detail: 'Ces données sont fournies par Fredo via data·inclusion',
      logo: 'fredo',
      origin: {
        api: `https://api.data.inclusion.gouv.fr/api/v0/services/fredo/${id.split('-').slice(1).join('-')}`,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjLmdhdmFuaWVyQGJldGEuZ291di5mciIsImFkbWluIjpmYWxzZX0.vd5hs4vraX6kSc6mQz98nFdrJgDw-3B6Gk-8UzoWNO4'
      }
    })
  ],
  [
    'Grand-Paris-Sud',
    (_: string) => ({
      label: 'Grand Paris Sud',
      link: 'https://data.grandparissud.fr/explore/dataset/cartographie-linguistique-coordination-linguistique/map/?disjunctive.commune&location=8,47.3852,4.44255&basemap=jawg.streets',
      logo: 'grand-paris-sud'
    })
  ],
  [
    'Paris',
    (_: string) => ({
      label: 'Paris',
      link: 'https://opendata.paris.fr/explore/dataset/reseau-parisien-dinclusion-numerique/information',
      logo: 'paris'
    })
  ],
  [
    'Haute-Vienne',
    (_: string) => ({
      label: 'Département de la Haute-Vienne',
      link: 'https://experience.arcgis.com/experience/968cea0bd0a54f499c9e029c3e27566b',
      logo: 'haute-vienne'
    })
  ],
  [
    'Hinaura',
    (_: string) => ({
      label: 'Hinaura',
      link: 'https://carto.hinaura.fr/?BaseRegionaleCarte',
      detail: 'Formulaire Hinaura',
      update_link: 'https://carto.hinaura.fr/?CommentModif',
      logo: 'hinaura'
    })
  ],
  [
    'Hub-Bretagne',
    (_: string) => ({
      label: 'Hub Bretagne',
      link: 'https://portrea.fr/',
      logo: 'hub-bretagne'
    })
  ],
  [
    'Mednum-BFC',
    (_: string) => ({
      label: 'Mednum BFC',
      link: 'https://www.mednum-bfc.fr/cartographie/',
      detail: 'Formulaire de la Mednum BFC',
      update_link: 'https://www.mednum-bfc.fr/maj-lieu/',
      logo: 'mednum-bfc'
    })
  ],
  [
    'Mulhouse',
    (_: string) => ({
      label: 'Ville de Mulhouse',
      link: 'https://data.mulhouse-alsace.fr/explore/dataset/68224_acteurs-de-la-mediation-numerique-a-mulhouse/map/?disjunctive.type_de_structure&disjunctive.type_public&disjunctive.type_equipement&disjunctive.acces_equipement_numerique_et_internet&disjunctive.tarif_acces_equipement&basemap=860abd&location=13,47.75291,7.32611/',
      logo: 'mulhouse'
    })
  ],
  [
    'Vendée',
    (_: string) => ({
      label: 'Département de la Vendée',
      link: 'https://www.vendeenumerique.fr/vendee-numerique/l-accompagnement-numerique-en-vendee/nos-dossiers/476-cartographie-vendeenne-des-lieux-de-mediation-numerique.html',
      logo: 'vendee-numerique'
    })
  ],
  [
    'Le-Havre',
    (_: string) => ({
      label: 'Ville du Havre',
      link: 'https://www.data.gouv.fr/fr/datasets/r/ca69354c-f4f0-48f4-864e-d5a1c7e835ad',
      detail: 'Données de la Ville du Havre',
      logo: 'le-havre'
    })
  ],
  [
    'Les-Landes',
    (_: string) => ({
      label: 'Département des Landes',
      link: 'https://www.pin40.fr/le-reseau/la-carte-des-acteurs-du-reseau',
      detail: "Portail de l'inclusion numérique des landes",
      update_link: 'https://framaforms.org/cartographie-des-espaces-de-mediation-numerique-en-pays-de-la-loire-1580983145',
      logo: 'les-landes'
    })
  ],
  [
    'Paca',
    (_: string) => ({
      label: "Région Provence-Alpes-Côte d'Azur",
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-d-inclusion-numerique-provence-alpes-cote-d-azur/',
      logo: 'paca'
    })
  ],
  [
    'Loire-Atlantique',
    (_: string) => ({
      label: 'Département de la Loire-Atlantique',
      link: 'https://www.data.gouv.fr/fr/datasets/lieux-numeriques-en-loire-atlantique-2/',
      logo: 'loire-atlantique'
    })
  ],
  [
    'RhinOcc',
    (_: string) => ({
      label: 'RhinOcc',
      link: 'https://rhinocc.fr/carte/',
      detail: 'Formulaire RhinOcc',
      update_link: 'https://rhinocc.fr/recensement/',
      logo: 'rhinocc'
    })
  ],
  [
    'Res-in',
    (_: string) => ({
      label: 'Rés-in',
      link: 'https://resin.grandlyon.com/acteurs',
      detail: 'Réseau d’inclusion numérique de la Métropole de Lyon',
      update_link: 'https://resin.grandlyon.com/connexion',
      logo: 'resin'
    })
  ],
  [
    'soliguide',
    (id: string) => ({
      label: 'Soliguide',
      link: 'https://soliguide.fr',
      detail: "L'information utile à ceux qui en ont besoin",
      update_link: 'https://soliguide.fr/fr/connexion',
      logo: 'soliguide',
      origin: {
        api: `https://api.data.inclusion.gouv.fr/api/v0/services/soliguide/${id.split('-')[1]}`,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjLmdhdmFuaWVyQGJldGEuZ291di5mciIsImFkbWluIjpmYWxzZX0.vd5hs4vraX6kSc6mQz98nFdrJgDw-3B6Gk-8UzoWNO4'
      }
    })
  ],
  [
    'SIILAB',
    (_: string) => ({
      label: 'Siilab',
      link: 'http://carto.assembleurs.com/',
      update_link: 'https://solen1.enquetes.social.gouv.fr/cgi-3/HE/SF?P=76z14z2z-1z-1z2747C6FAAF',
      logo: 'siilab'
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
      const [source, sourceId] = id.split('_');
      return availableSourcesMap.get(source)?.(sourceId);
    })
    .filter((source): source is SourcePresentation => source != undefined)
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
          ...ifAny('typologies', lieu.typologies?.map((typologie: Typologie) => typologieValue[typologie]).join(', ')),
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
