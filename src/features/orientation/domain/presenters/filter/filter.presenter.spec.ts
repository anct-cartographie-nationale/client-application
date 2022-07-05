import { FilterPresentation, FilterPresenter } from './filter.presenter';
import { firstValueFrom } from 'rxjs';

describe('filter presenter', (): void => {
  it('should add a filter', async (): Promise<void> => {
    const filterPresenter: FilterPresenter = new FilterPresenter();

    filterPresenter.setFilter({
      name: 'Gratuit',
      type: 'modalites'
    });

    const filters: FilterPresentation[] = await firstValueFrom(filterPresenter.filters$);

    expect(filters).toStrictEqual([
      {
        name: 'Gratuit',
        type: 'modalites'
      }
    ]);
  });
});
