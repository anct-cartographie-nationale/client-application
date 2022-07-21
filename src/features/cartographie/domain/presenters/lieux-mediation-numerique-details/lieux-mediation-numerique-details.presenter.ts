import { combineLatest, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { LieuMediationNumeriqueDetailsPresentation } from './lieu-mediation-numerique-details.presentation';
import { parseHoraires } from '../horaires/horaires.presenter';

const definedLieuMediationNumeriqueOnly = (
  LieuMediationNumerique: LieuMediationNumerique | undefined
): LieuMediationNumerique is LieuMediationNumerique => LieuMediationNumerique != null;

const toLieuMediationNumeriqueMatchingRouteId = ([LieuMediationNumerique, params]: [
  LieuMediationNumerique[],
  { [key: string]: string }
]): LieuMediationNumerique | undefined =>
  LieuMediationNumerique.find((LieuMediationNumerique: LieuMediationNumerique) => LieuMediationNumerique.id === params['id']);

export class LieuxMediationNumeriqueDetailsPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuMediationNumeriqueFromParams$(
    params: Observable<{ [key: string]: string }>
  ): Observable<LieuMediationNumeriqueDetailsPresentation> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), params]).pipe(
      map(toLieuMediationNumeriqueMatchingRouteId),
      filter(definedLieuMediationNumeriqueOnly),
      map((lieu: LieuMediationNumerique): LieuMediationNumeriqueDetailsPresentation => {
        return {
          ...lieu,
          horaires: lieu.horaires !== '' && lieu.horaires != null ? parseHoraires(lieu.horaires ?? '') : undefined,
          typologie: lieu.typologie?.join(', '),
          adresse: [lieu.adresse.voie, lieu.adresse.complement_adresse, lieu.adresse.code_postal, lieu.adresse.commune].join(
            ' '
          )
        };
      })
    );
  }
}
