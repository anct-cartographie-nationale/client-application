import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConseillerOnMapPresentation } from '../../../presenters';
import { ConseillersRepository } from '../../../reporitories';

const onlyConseillerCoordonne = (conseiller: ConseillerOnMapPresentation): boolean =>
  (conseiller.coordinateurs?.length ?? 0) > 0;

const onlyConseillerNonCoordonne = (conseiller: ConseillerOnMapPresentation): boolean =>
  (conseiller.coordinateurs?.length ?? 0) === 0;

export class ConseillersOnMapPresenter {
  public constructor(private readonly _conseillersRepository: ConseillersRepository) {}

  public conseillers$ = (): Observable<ConseillerOnMapPresentation[]> => this._conseillersRepository.getAll$();

  public nombreConseillersNonCoordonnes$: Observable<number> = this.conseillers$().pipe(
    map((conseillers: ConseillerOnMapPresentation[]) => conseillers.filter(onlyConseillerNonCoordonne).length)
  );

  public nombreConseillersCoordonnes$: Observable<number> = this.conseillers$().pipe(
    map((conseillers: ConseillerOnMapPresentation[]) => conseillers.filter(onlyConseillerCoordonne).length)
  );
}
