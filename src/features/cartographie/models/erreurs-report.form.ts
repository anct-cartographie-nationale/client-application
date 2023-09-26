export enum AvailableErreur {
  horaires = 'Horaires',
  servicesProposes = 'Services proposés',
  adresse = 'Adresse',
  contacts = 'Contacts',
  accompagnements = 'Accompagnements',
  labels = 'Labels',
  public = 'Public',
  autre = 'Autre'
}

export type ErreursReportForm = {
  selected: AvailableErreur[];
  precision: string;
};
