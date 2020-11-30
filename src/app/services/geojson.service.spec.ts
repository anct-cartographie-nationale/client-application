import { TestBed } from '@angular/core/testing';
import { Address } from '../models/address.model';

import { GeojsonService } from './geojson.service';
import { HttpClientModule } from '@angular/common/http';

describe('GeojsonService', () => {
  let service: GeojsonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeojsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get coord with query string Rue de la Mairie Feyzin ', async () => {
    await new Promise((resolve) => {
      service.getCoord('Rue de la Mairie', 'Feyzin').subscribe(
        (val) => {
          expect(val.geometry.getLat()).toEqual(4.8591584);
          expect(val.geometry.getLon()).toEqual(45.6727968);
          resolve();
        },
        (err) => {
          resolve();
        }
      );
    });
  });
});
