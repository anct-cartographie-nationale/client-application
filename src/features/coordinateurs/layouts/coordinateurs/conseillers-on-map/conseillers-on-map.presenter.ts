import { Observable, of } from 'rxjs';
import conseillersData from '../../../data/conseillers.json';
import { ConseillerOnMapPresentation } from '../../../presenters';

export class ConseillersOnMapPresenter {
  public conseillers$ = (): Observable<ConseillerOnMapPresentation[]> => of(conseillersData as ConseillerOnMapPresentation[]);
}
