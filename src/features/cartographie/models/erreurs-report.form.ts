export enum AvailableErreur {
  horaires = 'Horaires',
  servicesProposes = 'Services proposés',
  adresse = 'Adresse',
  contacts = 'Contacts',
  accompagnements = 'Accompagnements',
  labels = 'Labels',
  public = 'Public',
  lieuNExistePlus = "Le lieu n'existe plus"
}

export type ErreursReportForm = {
  selected: AvailableErreur[];
  precision: string;
};
