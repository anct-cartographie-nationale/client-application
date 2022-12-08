import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { DepartementPresentation, LieuMediationNumeriquePresentation, RegionPresentation } from '../../../core';
import {
  DEPARTEMENT_ZOOM_LEVEL,
  inDepartementZoomLevel,
  LIEUX_ZOOM_LEVEL,
  REGION_ZOOM_LEVEL
} from '../../../cartographie/presenters';
import {
  departementFromNom,
  regionFromNom,
  regionFromDepartement,
  toDepartement,
  toRegion,
  nearestRegion
} from './collectivite-territoriale.presenter';

describe('collectivite territoriale presenter', (): void => {
  it('should get département from code postal', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '69210'
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('69');
  });

  it('should get département from code postal, prefix do not match code departement', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '42620'
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('03');
  });

  it('should get département from code postal located in Haute-Corse', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '20270'
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('2B');
  });

  it('should get département from code postal located in Martinique', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '97260'
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('972');
  });

  it('should get département from code postal located in Corse-du-Sud', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '20142'
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('2A');
  });

  it('should get département from code INSEE', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '1234',
      code_insee: '54321'
    } as LieuMediationNumeriquePresentation;

    const codeDepartement: string | undefined = toDepartement(lieuDeMediationNumerique)?.code;

    expect(codeDepartement).toStrictEqual('54');
  });

  it('should get region from code postal', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '69210'
    } as LieuMediationNumeriquePresentation;

    const codeRegion: string | undefined = toRegion(lieuDeMediationNumerique)?.code;

    expect(codeRegion).toStrictEqual('84');
  });

  it('should get region from code INSEE', (): void => {
    const lieuDeMediationNumerique: LieuMediationNumeriquePresentation = {
      code_postal: '1234',
      code_insee: '54321'
    } as LieuMediationNumeriquePresentation;

    const codeRegion: string | undefined = toRegion(lieuDeMediationNumerique)?.code;

    expect(codeRegion).toStrictEqual('44');
  });

  it('should get region from departement', (): void => {
    const departement: DepartementPresentation = {
      code: '30',
      nom: 'Gard',
      zoom: 10,
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
      zoom: 8,
      localisation: Localisation({
        longitude: 2.137222,
        latitude: 43.702222
      })
    });
  });

  it('should find a departement by name', (): void => {
    const nomDepartement: string = 'Paris';
    const departement: DepartementPresentation | undefined = departementFromNom(nomDepartement);

    expect(departement?.code).toStrictEqual('75');
  });

  it('should find a region by name', (): void => {
    const nomRegion: string = 'Île-de-France';
    const region: RegionPresentation | undefined = regionFromNom(nomRegion);

    expect(region?.code).toStrictEqual('11');
  });

  it('should get Île-de-France as nearest region', (): void => {
    const localisation: Localisation = Localisation({
      latitude: 48.709168,
      longitude: 2.504723
    });

    const region: RegionPresentation | undefined = nearestRegion(localisation);

    expect(region?.nom).toStrictEqual('Île-de-France');
  });

  it('should get Auvergne-Rhône-Alpes as nearest region', (): void => {
    const localisation: Localisation = Localisation({
      latitude: 45.515833,
      longitude: 4.538056
    });

    const region: RegionPresentation | undefined = nearestRegion(localisation);

    expect(region?.nom).toStrictEqual('Auvergne-Rhône-Alpes');
  });

  it('should check that zoom level is in deparement zoom level', (): void => {
    const isDepartementZoomLevel: boolean = inDepartementZoomLevel(DEPARTEMENT_ZOOM_LEVEL);

    expect(isDepartementZoomLevel).toStrictEqual(true);
  });

  it('should check that region zoom level is not in deparement zoom level', (): void => {
    const isDepartementZoomLevel: boolean = inDepartementZoomLevel(REGION_ZOOM_LEVEL);

    expect(isDepartementZoomLevel).toStrictEqual(false);
  });

  it('should check that lieux zoom level is not in deparement zoom level', (): void => {
    const isDepartementZoomLevel: boolean = inDepartementZoomLevel(LIEUX_ZOOM_LEVEL);

    expect(isDepartementZoomLevel).toStrictEqual(false);
  });
});
