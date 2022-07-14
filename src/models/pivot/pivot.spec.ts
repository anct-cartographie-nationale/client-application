import { Pivot, PivotError } from './pivot';

describe('pivot model', (): void => {
  it('should create a valide pivot using Siret id', (): void => {
    const pivot = Pivot('12345678910111');

    expect(pivot).toStrictEqual('12345678910111');
  });

  it('should create a valide pivot using RNA id', (): void => {
    const pivot = Pivot('W9R2003255');

    expect(pivot).toStrictEqual('W9R2003255');
  });

  it('should throw PivotError if pivot length is different than 14', (): void => {
    expect(() => {
      Pivot('42');
    }).toThrow(new PivotError('42'));
  });
});
