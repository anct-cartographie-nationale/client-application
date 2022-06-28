import { Siren, SirenError } from './siren';

describe('siren model', (): void => {
  it('should be a valid siren', (): void => {
    const siren = Siren('741548312');

    expect(siren).toStrictEqual('741548312');
  });

  it('should throw a SirenError when the siren is invalid', (): void => {
    expect(() => {
      Siren('7415483');
    }).toThrow(new SirenError('7415483'));
  });
});
