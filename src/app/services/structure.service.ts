import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeekDay } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Structure } from '../models/structure.model';
import { Day } from '../models/day.model';
import { OpeningDay } from '../models/openingDay.model';
import { Weekday } from '../structure-list/enum/weekday.enum';
import { Time } from '../models/time.model';
import { Filter } from '../structure-list/models/filter.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  constructor(private http: HttpClient) {}

  public createStructure(structure: Structure, profile: User): Observable<Structure> {
    const idUser = profile.email;
    return this.http.post('/api/structures', { structure, idUser }).pipe(map((item: Structure) => new Structure(item)));
  }

  public postStructure(id: number, structure: Structure): Observable<Structure> {
    structure.updatedAt = new Date().toString();
    return this.http.post('/api/structures/' + id, structure).pipe(map((item: Structure) => new Structure(item)));
  }

  public getStructure(id: number): Observable<Structure> {
    return this.http.get('/api/structures/' + id).pipe(map((item: any) => new Structure(item)));
  }
  public getStructures(filters: Filter[]): Observable<Structure[]> {
    if (filters && filters.length > 0) {
      let requestUrl = '/api/structures/search';
      const queryString = _.find(filters, { name: 'query' });
      if (queryString) {
        _.remove(filters, { name: 'query' });
        requestUrl += `?query=${queryString.value}`;
      }
      const formatedFilters = this.formatFilters(filters);
      return this.http
        .post(requestUrl, { filters: formatedFilters })
        .pipe(map((data: any[]) => data.map((item) => new Structure(item))));
    } else {
      return this.http.get('/api/structures').pipe(map((data: any[]) => data.map((item) => new Structure(item))));
    }
  }

  private formatFilters(filters: Filter[]): object {
    return filters.map((filter) => {
      return { [filter.name]: filter.value };
    });
  }

  /**
   * Update opening hours of structure
   * @param structure Structure model
   */
  public updateOpeningStructure(structure: Structure, dateTime): Structure {
    // Get current day of week
    const currentDate = dateTime;
    const dayOfWeek: number = currentDate.weekday;

    // Checks if minutes start with zero to avoid deletion
    let now: number;
    if (currentDate.minute.toString().length !== 1) {
      now = parseInt('' + currentDate.hour + currentDate.minute, 10);
    } else {
      now = parseInt('' + currentDate.hour + 0 + currentDate.minute, 10);
    }

    // Get the schedules of a structure according to his day to indicate if it's open
    const structureSchedules: Day = structure.getDayhours(dayOfWeek);

    structure.isOpen = false;
    if (structureSchedules.open) {
      structureSchedules.time.forEach((period: Time) => {
        if (this.compareSchedules(period.openning, period.closing, now)) {
          structure.isOpen = true;
        }
      });
    }
    structure.openedOn = this.getNextOpening(structure, dayOfWeek, now);
    return structure;
  }

  /**
   * Checks if the current time is in the time interval of the structure
   * @param startTime start of period
   * @param endTime end of period
   * @param currentTime actual time
   */
  private compareSchedules(startTime: number, endTime: number, currentTime: number): boolean {
    return currentTime >= startTime && currentTime <= endTime;
  }

  // Get enum key
  private getEnumKeyByEnumValue(enumBase, enumValue): number {
    let keys = Object.keys(enumBase).filter((x) => {
      if (enumBase[x].toString().toLowerCase() == enumValue) {
        return x;
      }
    });
    return keys.length > 0 ? parseInt(keys[0]) : null;
  }
  private getNextOpening(s: Structure, dayOfWeek: number, hourBase: number): OpeningDay {
    let periodBeforeCurrentDay = null;

    // Browse day of week
    for (const [i, period] of Object.entries(s.hours)) {
      if (period.open) {
        // Check if it's current day
        if (i === this.numberToDay(dayOfWeek)) {
          if (
            (period.time[0].openning <= hourBase && period.time[0].closing >= hourBase) ||
            (period.time[1] && period.time[1].openning <= hourBase && period.time[1].closing >= hourBase)
          ) {
            return new OpeningDay(i, null);
          } else if (period.time[0].openning >= hourBase) {
            return new OpeningDay(i, this.numberToHour(period.time[0].openning));
          } else if (period.time[1] && period.time[1].openning >= hourBase) {
            return new OpeningDay(i, this.numberToHour(period.time[1].openning));
          }
          // Return the next day > current day.
        } else if (
          this.getEnumKeyByEnumValue(WeekDay, i) > this.getEnumKeyByEnumValue(WeekDay, this.numberToDay(dayOfWeek))
        ) {
          return new OpeningDay(i, this.numberToHour(period.time[0].openning));
          // Return the next day < current day.
        } else if (!periodBeforeCurrentDay) {
          periodBeforeCurrentDay = new OpeningDay(i, this.numberToHour(period.time[0].openning));
        }
      }
    }
    return periodBeforeCurrentDay ? periodBeforeCurrentDay : '';
  }

  private numberToDay(n: number): string {
    return Weekday[n];
  }

  private numberToHour(n: number): string {
    if (n.toString().length === 3) {
      const tabNum = n.toString().match(/.{1,1}/g);
      return tabNum[0] + 'h' + tabNum[1] + tabNum[2];
    } else if (n.toString().length === 4) {
      const tabNum = n.toString().match(/.{1,2}/g);
      return tabNum[0] + 'h' + tabNum[1];
    }
  }
}
