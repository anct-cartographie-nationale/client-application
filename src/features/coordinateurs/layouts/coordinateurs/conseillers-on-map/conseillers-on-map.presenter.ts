import { Observable, of } from 'rxjs';
import conseillersData from '../../../data/conseillers.json';
import { ConseillerOnMapPresentation } from '../../../presenters';
import { map } from 'rxjs/operators';

const onlyConseillerCoordonne = (conseiller: ConseillerOnMapPresentation): boolean =>
  (conseiller.coordinateurs?.length ?? 0) > 0;

const onlyConseillerNonCoordonne = (conseiller: ConseillerOnMapPresentation): boolean =>
  (conseiller.coordinateurs?.length ?? 0) === 0;

export class ConseillersOnMapPresenter {
  public conseillers$ = (): Observable<ConseillerOnMapPresentation[]> => of(conseillersData as ConseillerOnMapPresentation[]);

  public nombreConseillersNonCoordonnes$: Observable<number> = this.conseillers$().pipe(
    map((conseillers: ConseillerOnMapPresentation[]) => conseillers.filter(onlyConseillerNonCoordonne).length)
  );

  public nombreConseillersCoordonnes$: Observable<number> = this.conseillers$().pipe(
    map((conseillers: ConseillerOnMapPresentation[]) => conseillers.filter(onlyConseillerCoordonne).length)
  );
}
