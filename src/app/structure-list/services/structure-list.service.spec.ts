import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Day } from '../models/day.model';
import { Structure } from '../models/structure.model';
import { Week } from '../models/week.model';
import { StructureService } from './structure-list.service';
const { DateTime } = require('luxon');

describe('StructureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
  });
  let structureService: StructureService;
  beforeEach(inject([StructureService], (s: StructureService) => {
    structureService = s;
  }));

  it('Mise à jour ouverture de la structure : should return true', () => {
    // Init structure avec aucun horaire
    const s: Structure = new Structure();
    s.hours = new Week();
    s.hours.monday = new Day(false);
    s.hours.tuesday = new Day(false);
    s.hours.wednesday = new Day(false);
    s.hours.thursday = new Day(false);
    s.hours.friday = new Day(false);
    s.hours.saturday = new Day(false);
    s.hours.sunday = new Day(false);

    s.hours.thursday.open = true;
    s.hours.thursday.time = [
      { openning: 805, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];

    // Init date sur un jeudi à 9h05
    const dt = new DateTime.local(2020, 10, 8, 9, 5);
    const result = structureService.updateOpeningStructure(s, dt);
    expect(result.isOpen).toEqual(true);
  });

  it('Mise à jour ouverture de la structure : should return false', () => {
    // Init structure avec aucun horaire
    const s: Structure = new Structure();
    s.hours = new Week();
    s.hours.monday = new Day();
    s.hours.tuesday = new Day();
    s.hours.wednesday = new Day();
    s.hours.thursday = new Day();
    s.hours.friday = new Day();
    s.hours.saturday = new Day();
    s.hours.sunday = new Day();

    s.hours.thursday.open = true;
    s.hours.thursday.time = [{ openning: 1400, closing: 1600 }];

    // Init date sur un jeudi à 9h05
    const dt = new DateTime.local(2020, 10, 8, 9, 5);
    const result = structureService.updateOpeningStructure(s, dt);
    expect(result.isOpen).toEqual(false);
  });
});
