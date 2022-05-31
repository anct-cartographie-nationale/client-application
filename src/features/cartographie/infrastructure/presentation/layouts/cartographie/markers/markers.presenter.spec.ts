import { firstValueFrom } from 'rxjs';
import { MarkersPresenter } from './markers.presenter';

describe('markers presenter', (): void => {
  it('should focus a marker by id', async (): Promise<void> => {
    const markersPresenter: MarkersPresenter = new MarkersPresenter();
    const markerId: string = '18745';

    markersPresenter.focus(markerId);

    const focusedMarkerId: string = await firstValueFrom(markersPresenter.focused$);

    expect(focusedMarkerId).toStrictEqual(markerId);
  });

  it('should highlight a marker by id', async (): Promise<void> => {
    const markersPresenter: MarkersPresenter = new MarkersPresenter();
    const markerId: string = '18745';

    markersPresenter.highlight(markerId);

    const highlightedMarkerId: string = await firstValueFrom(markersPresenter.highlighted$);

    expect(highlightedMarkerId).toStrictEqual(markerId);
  });
});
