import { DepartementPresentation, departements } from '../../collectivite-territoriale';

export const toDepartement = (codeDepartement: string): DepartementPresentation | undefined =>
  departements.find((departement: DepartementPresentation) => departement.code === codeDepartement);

export const definedDepartements = (
  departementPresentation?: DepartementPresentation
): departementPresentation is DepartementPresentation => departementPresentation != undefined;
