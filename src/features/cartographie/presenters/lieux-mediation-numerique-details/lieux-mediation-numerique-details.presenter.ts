import { combineLatest, filter, Observable, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LieuMediationNumerique,
  LieuxMediationNumeriqueRepository,
  Localisation,
  NO_LOCALISATION,
  ifAny,
  parseHoraires,
  openingStatus,
  geographicDistance
} from '../../../core';
import { LieuMediationNumeriqueDetailsPresentation } from './lieu-mediation-numerique-details.presentation';
import { ParamMap } from '@angular/router';

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
  localisation === NO_LOCALISATION ? undefined : geographicDistance(lieuMediationNumerique.localisation, localisation);

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
        ([lieu, localisation]: [LieuMediationNumerique, Localisation]): LieuMediationNumeriqueDetailsPresentation => ({
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
          ...ifAny('localisation', lieu.localisation),
          ...ifAny('distance', getDistance(lieu, localisation)),
          ...ifAny('prise_rdv', lieu.prise_rdv)
        })
      )
    );
  }
}
