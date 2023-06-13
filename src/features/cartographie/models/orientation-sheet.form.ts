export type UsagerOrientationSheetForm = {
  firstname: string;
  lastname: string;
  details?: string;
};

export type PrescripteurOrientationSheetForm = {
  firstname: string;
  lastname: string;
  place: string;
};

export type OrientationSheetForm = {
  usager: UsagerOrientationSheetForm;
  prescripteur: PrescripteurOrientationSheetForm;
};
