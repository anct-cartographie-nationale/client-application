import { firstValueFrom } from 'rxjs';
import { MarkersPresenter } from './markers.presenter';

describe('markers presenter', (): void => {
  it('should highlight a marker by id', async (): Promise<void> => {
    const markersPresenter: MarkersPresenter = new MarkersPresenter();
    const markerId: string = '18745';

    markersPresenter.highlight(markerId);

    const highlightedMarkerId: string = await firstValueFrom(markersPresenter.highlighted$);

    expect(highlightedMarkerId).toStrictEqual(markerId);
  });

  it('should select a marker by id', async (): Promise<void> => {
    const markersPresenter: MarkersPresenter = new MarkersPresenter();
    const markerId: string = '18745';

    markersPresenter.select(markerId);

    const selectedMarkerId: string = await firstValueFrom(markersPresenter.selected$);

    expect(selectedMarkerId).toStrictEqual(markerId);
  });

  it('should highlight a marker by id and reset selected marker', async (): Promise<void> => {
    const markersPresenter: MarkersPresenter = new MarkersPresenter();
    const markerId: string = '18745';

    markersPresenter.select(markerId);
    markersPresenter.highlight(markerId);

    const highlightedMarkerId: string = await firstValueFrom(markersPresenter.highlighted$);
    const selectedMarkerId: string = await firstValueFrom(markersPresenter.selected$);

    expect(highlightedMarkerId).toStrictEqual(markerId);
    expect(selectedMarkerId).toStrictEqual('');
  });
});
