import { PerimetrePresentation } from '../../presenters';
import { invertPerimetreSelection } from './filter.presenter';

describe('filter presenter', (): void => {
  it('should invert perimetre selection when empty', (): void => {
    const filter: PerimetrePresentation[] = [];
    const inverted: PerimetrePresentation[] = invertPerimetreSelection(filter);

    expect(inverted).toStrictEqual<PerimetrePresentation[]>(['Départemental', 'Bassin de vie']);
  });

  it('should invert perimetre selection when full', (): void => {
    const filter: PerimetrePresentation[] = ['Départemental', 'Bassin de vie'];
    const inverted: PerimetrePresentation[] = invertPerimetreSelection(filter);

    expect(inverted).toStrictEqual<PerimetrePresentation[]>([]);
  });

  it('should invert perimetre selection when Départemental only', (): void => {
    const filter: PerimetrePresentation[] = ['Départemental'];
    const inverted: PerimetrePresentation[] = invertPerimetreSelection(filter);

    expect(inverted).toStrictEqual<PerimetrePresentation[]>(['Départemental']);
  });
});
