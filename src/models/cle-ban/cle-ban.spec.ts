import { CleBan, CleBanError } from './cle-ban';

describe('cleBan model', (): void => {
  it('should create a valide cleBan', (): void => {
    const cleBan = CleBan('13001_3079_00001');

    expect(cleBan).toStrictEqual('13001_3079_00001');
  });

  it('should throw CleBanError if cle ban do no match required format', (): void => {
    expect(() => {
      CleBan('42');
    }).toThrow(new CleBanError('42'));
  });
});
