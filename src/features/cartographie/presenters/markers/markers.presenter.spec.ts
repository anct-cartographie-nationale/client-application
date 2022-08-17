import { firstValueFrom } from 'rxjs';
import { Localisation } from '../../../core';
import { getBoundFromLocalisations, MarkersPresenter } from './markers.presenter';

describe('markers presenter', (): void => {
  it('should select a marker by id', async (): Promise<void> => {
    const markersPresenter: MarkersPresenter = new MarkersPresenter();
    const markerId: string = '18745';

    markersPresenter.select(markerId);

    const selectedMarkerId: string = await firstValueFrom(markersPresenter.selected$);

    expect(selectedMarkerId).toStrictEqual(markerId);
  });

  it('should find localisation bounds from localisations list', (): void => {
    const localisations: Localisation[] = [
      Localisation({ latitude: 46.28, longitude: 4.46 }),
      Localisation({ latitude: 47.24, longitude: 4.76 }),
      Localisation({ latitude: 52.79, longitude: 1.05 }),
      Localisation({ latitude: 46.09, longitude: -1.22 }),
      Localisation({ latitude: 33.07, longitude: 4.86 }),
      Localisation({ latitude: 41.28, longitude: 7.14 })
    ];

    const bounds: [Localisation, Localisation] = getBoundFromLocalisations(localisations);

    expect(bounds).toStrictEqual([
      Localisation({ latitude: 52.79, longitude: -1.22 }),
      Localisation({ latitude: 33.07, longitude: 7.14 })
    ]);
  });
});
