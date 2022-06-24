import { Siret, SiretError } from './siret';

describe('siret model', (): void => {
  it('should create a valide siret', (): void => {
    const siret = Siret('12345678910111');

    expect(siret).toStrictEqual('12345678910111');
  });

  it('should throw SiretError if siret len is different than 14', (): void => {
    expect(() => {
      Siret('42');
    }).toThrow(new SiretError('42'));
  });
});
