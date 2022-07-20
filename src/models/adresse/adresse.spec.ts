import { Adresse, CodeInseeError, CodePostalError, CommuneError } from './adresse';

describe('adresse model', (): void => {
  it('should create a valid address', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57260',
      commune: 'Metz'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw CodePostalError when code_postal is invalid', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: 'error',
      code_insee: '57260',
      commune: 'Metz'
    };

    expect(() => {
      Adresse(adresseData);
    }).toThrow(new CodePostalError(adresseData.code_postal));
  });

  it('should throw CodeInseeError when code_insee is invalid', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: 'error',
      commune: 'Metz'
    };

    expect(() => {
      Adresse(adresseData);
    }).toThrow(new CodeInseeError(adresseData.code_insee));
  });

  it('should create a valid address with 6 digits for code insee including optional 0 after department code', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '38110',
      code_insee: '380546',
      commune: 'La Tour-du-Pin'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw CodeInseeError when code_insee is 7 digits', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '5723687',
      commune: 'Metz'
    };

    expect(() => {
      Adresse(adresseData);
    }).toThrow(new CodeInseeError(adresseData.code_insee));
  });

  it('should create a valid address with 8 digits code_insee', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '38100',
      code_insee: '38-2-33-546',
      commune: 'Metz'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address with code_insee in Corse', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '20100',
      code_insee: '2A100',
      commune: 'Ajaccio'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address with commune containing accents', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '17410',
      code_insee: '17369',
      commune: 'Saint-Martin de Ré'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address with commune containing apostrophes', (): void => {
    const adresseData = {
      voie: 'Ante 1 rue Denfert Rochereau',
      code_postal: '79400',
      commune: 'Saint-Maixent-l’Ecole'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address without code insee', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '17410',
      commune: 'Saint-Martin de Ré'
    };

    const adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw CommuneError when commune contains invalid characters', (): void => {
    const adresseData = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz$'
    };

    expect(() => {
      Adresse(adresseData);
    }).toThrow(new CommuneError(adresseData.commune));
  });
});
