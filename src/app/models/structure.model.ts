import { Weekday } from '../structure-list/enum/weekday.enum';
import { Day } from './day.model';
import { OpeningDay } from './openingDay.model';
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
  public voie: number;
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
  public distance?: string;

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

  public openDisplay(): string {
    if (this.isOpen) {
      return 'Ouvert actuellement ';
    } else if (this.openedOn.day) {
      return 'Fermé - Ouvre ' + this.openedOn.day + ' à ' + this.openedOn.schedule;
    } else {
      return 'Fermé - Aucun horaire disponible ';
    }
  }

  /**
   * Return a range, according to the distance, between [1,3] to get a distance reference.
   * - [0,500m] => 1
   * - [500m,1km] => 2
   * - [1km, [ => 3
   */
  public getDistanceRange(): number {
    if (!this.distance) {
      return 3;
    } else {
      // If it's in km
      if (this.distance.length > 3) {
        return 3;
      } else if (parseInt(this.distance, 10) < 500) {
        // If it's between 0 and 500 m
        return 1;
      } else {
        return 2;
      }
    }
  }
}
