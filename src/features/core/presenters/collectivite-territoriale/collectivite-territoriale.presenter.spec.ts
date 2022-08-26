import { regionFromDepartement, toDepartement, toRegion } from './collectivite-territoriale.presenter';
import {
  Adresse,
  DepartementPresentation,
  LieuMediationNumeriquePresentation,
  Localisation,
  RegionPresentation
} from '../../../core';

describe('collectivite territoriale presenter', (): void => {
  it('should get département from code postal', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '69210' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('69');
  });

  it('should get département from code postal, prefix do not match code departement', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '42620' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('03');
  });

  it('should get département from code postal located in Haute-Corse', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '20270' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('2B');
  });

  it('should get département from code postal located in Martinique', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '97260' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('972');
  });

  it('should get département from code postal located in Corse-du-Sud', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '20142' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('2A');
  });

  it('should get département from code INSEE', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '1234', code_insee: '54321' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('54');
  });

  it('should get region from code postal', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '69210' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeRegion: string | undefined = toRegion(lieuDeMediationNumerique)?.code;

    expect(codeRegion).toStrictEqual('84');
  });

  it('should get region from code INSEE', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      adresse: { code_postal: '1234', code_insee: '54321' } as Adresse
    } as LieuMediationNumeriquePresentation;

    const codeRegion: string | undefined = toRegion(lieuDeMediationNumerique)?.code;

    expect(codeRegion).toStrictEqual('44');
  });

  it('should get region from departement', (): void => {
    const departement: DepartementPresentation = {
      code: '30',
      nom: 'Gard',
      zoom: 11,
      localisation: Localisation({
        longitude: 4.179823679654268,
        latitude: 43.993762729920775
      })
    };

    const region: RegionPresentation | undefined = regionFromDepartement(departement);

    expect(region).toStrictEqual<RegionPresentation>({
      code: '76',
      nom: 'Occitanie',
      departements: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
      zoom: 9,
      localisation: Localisation({
        longitude: 2.137222,
        latitude: 43.702222
      })
    });
  });
});
