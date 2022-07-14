import { Rna, RnaError } from './rna';

describe('rna model', (): void => {
  it('should create a valide rna', (): void => {
    const rna = Rna('W9R2003255');

    expect(rna).toStrictEqual('W9R2003255');
  });

  it('should throw RnaError if rna len is different than 14', (): void => {
    expect(() => {
      Rna('42');
    }).toThrow(new RnaError('42'));
  });
});
