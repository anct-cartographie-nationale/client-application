import { DepartementPresentation } from '../../collectivite-territoriale';

export const definedDepartements = (
  departementPresentation?: DepartementPresentation
): departementPresentation is DepartementPresentation => departementPresentation != undefined;

const matchingDepartementCode = (currentValue: DepartementPresentation) => (departement: DepartementPresentation) =>
  departement.code === currentValue.code;

const byDepartementCode = (currentValue: DepartementPresentation) => (departement: DepartementPresentation) =>
  !matchingDepartementCode(currentValue)(departement);

const addLieuToDepartementsWithLieuxCount = (
  departement: DepartementPresentation,
  departementsWithLieuxCount: DepartementPresentation[],
  alreadyPresentDepartement?: DepartementPresentation
) =>
  alreadyPresentDepartement
    ? [
        ...departementsWithLieuxCount.filter(byDepartementCode(departement)),
        { ...alreadyPresentDepartement, lieuxCount: (alreadyPresentDepartement.lieuxCount ?? 0) + 1 }
      ]
    : [...departementsWithLieuxCount, { ...departement, lieuxCount: 1 }];

export const countLieuxInDepartements = (
  departementsWithLieuxCount: DepartementPresentation[],
  departement: DepartementPresentation
) =>
  addLieuToDepartementsWithLieuxCount(
    departement,
    departementsWithLieuxCount,
    departementsWithLieuxCount.find(matchingDepartementCode(departement))
  );

export const byLieuxCount = (departementA: DepartementPresentation, departementB: DepartementPresentation): number =>
  (departementB.lieuxCount ?? 0) - (departementA.lieuxCount ?? 0);
