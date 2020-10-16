import { Day } from './day.model';
import { Time } from './time.model';

export class Week {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;

  constructor(obj?: any) {
    Object.assign(this, obj, {
      monday: obj && obj.monday ? new Day(obj.monday) : null,
      tuesday: obj && obj.tuesday ? new Day(obj.tuesday) : null,
      wednesday: obj && obj.wednesday ? new Day(obj.wednesday) : null,
      thursday: obj && obj.thursday ? new Day(obj.thursday) : null,
      friday: obj && obj.friday ? new Day(obj.friday) : null,
      saturday: obj && obj.saturday ? new Day(obj.saturday) : null,
      sunday: obj && obj.sunday ? new Day(obj.sunday) : null,
    });
  }
}
