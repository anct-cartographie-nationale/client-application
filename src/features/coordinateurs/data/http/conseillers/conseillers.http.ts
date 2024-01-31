import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { DATA_COORDINATEURS_CONFIGURATION } from '../../../../../root';
import { ResultFoundPresentation } from '../../../../adresse';
import { Conseiller } from '../../../models';
import { ConseillersRepository } from '../../../reporitories';

const onlyMatchingConseillerNom =
  (searchTerm: string) =>
  (conseiller: Conseiller): boolean =>
    conseiller.nom.toLowerCase().includes(searchTerm.toLowerCase());

const toResultFound = (conseiller: Conseiller): ResultFoundPresentation<{ type: 'conseiller' }> => ({
  id: conseiller.id,
  context: conseiller.structurePorteuse.adresse,
  label: conseiller.nom,
  localisation: Localisation({
    latitude: conseiller.latitude,
    longitude: conseiller.longitude
  }),
  payload: {
    type: 'conseiller'
  }
});

export class ConseillersHttp extends ConseillersRepository {
  public constructor(private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$ = (): Observable<Conseiller[]> =>
    this.httpClient.get<Conseiller[]>(DATA_COORDINATEURS_CONFIGURATION.conseillers);

  public search$(searchTerm: string, limit: number = 5): Observable<ResultFoundPresentation[]> {
    return this.getAll$().pipe(
      map((conseillers: Conseiller[]) =>
        conseillers.filter(onlyMatchingConseillerNom(searchTerm)).slice(0, limit).map(toResultFound)
      )
    );
  }
}
