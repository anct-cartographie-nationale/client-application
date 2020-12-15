import { Weekday } from '../structure-list/enum/weekday.enum';
import { Address } from './address.model';
import { Day } from './day.model';
import { OpeningDay } from './openingDay.model';
import { Week } from './week.model';
export class Structure {
  public id: number;
  public numero: string;
  public createdAt: string;
  public updatedAt: string;
  public structureRepresentation: string;
  public structureName: string;
  public structureType: string[];
  public description: string;
  public address: Address;
  public contactPhone: string;
  public contactMail: string;
  public website: string;
  public facebook: string;
  public twitter: string;
  public instagram: string;
  public gender: string;
  public contactName: string;
  public contactSurname: string;
  public fonction: string;
  public lockdownActivity: string;
  public pmrAccess: boolean;
  public publicsAccompaniment: string[];
  public proceduresAccompaniment: string[];
  public accessModality: string[];
  public documentsMeeting: string;
  public labelsQualifications: string[];
  public publics: string[];
  public nbComputers: number;
  public nbPrinters: number;
  public nbTablets: number;
  public nbNumericTerminal: number;
  public exceptionalClosures: string;
  public equipmentsAndServices: string[];
  public hours: Week;
  public equipmentsDetails: string;
  public equipmentsAccessType: string[];

  public isOpen: boolean;
  public openedOn: OpeningDay;
  public baseSkills: string[];
  public accessRight: string[];
  public parentingHelp: string[];
  public socialAndProfessional: string[];
  public digitalCultureSecurity: string[];

  public distance?: number;
  public coord?: number[];

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
      return 'Ouvert actuellement';
    } else if (this.openedOn.day) {
      return 'Fermé - Ouvre ' + this.hours.getDayTranslation(this.openedOn.day) + ' à ' + this.openedOn.schedule;
    } else {
      return 'Aucun horaire disponible';
    }
  }

  /**
   * Check if a structure has equipments
   */
  public hasEquipments(): boolean {
    if (this.equipmentsAndServices.length) {
      return true;
    }
    return false;
  }

  /**
   * Return a range, according to the distance, between [1,3] to get a distance reference.
   * - [0,5km] => 1
   * - [5km,10km] => 2
   * - [10km, [ => 3
   */
  public getDistanceRange(): number {
    if (!this.distance) {
      return 3;
    } else {
      // If it's in km
      if (this.distance > 10000) {
        return 3;
      } else if (this.distance < 5000) {
        // If it's between 0 and 500 m
        return 1;
      } else {
        return 2;
      }
    }
  }

  public getLat(): number {
    return this.coord[1];
  }

  public getLon(): number {
    return this.coord[0];
  }
}
