import { combineLatest, filter, Observable, of, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique, Localisation, NO_LOCALISATION } from '../../../../../models';
import { LieuMediationNumeriqueDetailsPresentation } from './lieu-mediation-numerique-details.presentation';
import { openingStatus, parseHoraires } from '../horaires/horaires.presenter';
import { ifAny } from '../../../infrastructure/utilities';
import { geographicDistance } from '../distance/distance.presenter';

const definedLieuMediationNumeriqueOnly = (
  LieuMediationNumerique: LieuMediationNumerique | undefined
): LieuMediationNumerique is LieuMediationNumerique => LieuMediationNumerique != null;

const toLieuMediationNumeriqueMatchingRouteId = ([LieuMediationNumerique, params]: [
  LieuMediationNumerique[],
  { [_: string]: string }
]): LieuMediationNumerique | undefined =>
  LieuMediationNumerique.find((LieuMediationNumerique: LieuMediationNumerique) => LieuMediationNumerique.id === params['id']);

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  localisation === NO_LOCALISATION ? undefined : geographicDistance(lieuMediationNumerique.localisation, localisation);

export class LieuxMediationNumeriqueDetailsPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuMediationNumeriqueFromParams$(
    params$: Observable<{ [key: string]: string }>,
    date: Date,
    localisation$: Observable<Localisation>
  ): Observable<LieuMediationNumeriqueDetailsPresentation> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), params$]).pipe(
      map(toLieuMediationNumeriqueMatchingRouteId),
      filter(definedLieuMediationNumeriqueOnly),
      withLatestFrom(localisation$),
      map(([lieu, localisation]: [LieuMediationNumerique, Localisation]): LieuMediationNumeriqueDetailsPresentation => {
        return {
          id: lieu.id,
          nom: lieu.nom,
          adresse: [lieu.adresse.voie, lieu.adresse.complement_adresse, lieu.adresse.code_postal, lieu.adresse.commune].join(
            ' '
          ),
          services: lieu.services,
          ...ifAny('horaires', parseHoraires(date)(lieu.horaires)),
          ...ifAny('status', openingStatus(date)(lieu.horaires)),
          ...ifAny('typologie', lieu.typologie?.join(', ')),
          ...ifAny('contact', lieu.contact),
          ...ifAny('presentation', lieu.presentation),
          ...ifAny('date_maj', lieu.date_maj),
          ...ifAny('publics_accueillis', lieu.publics_accueillis),
          ...ifAny('conditions_access', lieu.conditions_access),
          ...ifAny('labels_nationaux', lieu.labels_nationaux),
          ...ifAny('labels_autres', lieu.labels_autres),
          ...ifAny('modalites_accompagnement', lieu.modalites_accompagnement),
          ...ifAny('accessibilite', lieu.accessibilite),
          ...ifAny('distance', getDistance(lieu, localisation))
        };
      })
    );
  }
}
