import { Day } from './day.model';
import { OpeningDay } from './openingDay.model';
import { Weekday } from '../enum/weekday.enum';
import { Week } from './week.model';

export class Structure {
  public numero: string;
  public dateDeCreation: string;
  public derniereModification: string;
  public nomDeLusager: string;
  public votreStructureEstElle: string;
  public nomDeVotreStructure: string;
  public typeDeStructure: string;
  public description: string;
  public n: string;
  public voie: string;
  public telephone: string;
  public courriel: string;
  public siteWeb: string;
  public facebook: string;
  public twitter: string;
  public instagram: string;
  public civilite: string;
  public nom: string;
  public prenom: string;
  public fonction: string;
  public accessibilitePersonnesAMobiliteReduitePmr: boolean;
  public jaccompagneLesUsagersDansLeursDemarchesEnLigne: boolean;
  public accompagnementDesDemarches: string[];
  public wifi: boolean;
  public hours: Week;
  public isOpen: boolean;
  public openedOn: OpeningDay;

  constructor(obj?: any) {
    Object.assign(this, obj, {
      hours: obj && obj.hours ? new Week(obj.hours) : null,
    });
  }

  public getDayhours(day: Weekday): Day {
    switch (day) {
      case Weekday.monday:
        return this.hours.monday;
      case Weekday.tuesday:
        return this.hours.tuesday;
      case Weekday.thursday:
        return this.hours.thursday;
      case Weekday.wednesday:
        return this.hours.wednesday;
      case Weekday.friday:
        return this.hours.friday;
      case Weekday.saturday:
        return this.hours.saturday;
      case Weekday.sunday:
        return this.hours.sunday;
      default:
        return null;
    }
  }
}
