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

  it('should get address for id 26061 ', async () => {
    await new Promise((resolve) => {
      service.getAddressByIdVoie(26061).subscribe(
        (val) => {
          expect(val.zipcode).toEqual('69800');
          expect(val.text).toEqual('13ème Rue Cité Berliet');
          resolve();
        },
        (err) => {
          resolve();
        }
      );
    });
  });

  it('should get coord with query string avenue foch 69006 ', async () => {
    await new Promise((resolve) => {
      service.getCoord(new Address({ text: 'avenue foch', citycode: '69006' })).subscribe(
        (val) => {
          expect(val.geometry.getLat()).toEqual(4.8429024);
          expect(val.geometry.getLon()).toEqual(45.7733884);
          resolve();
        },
        (err) => {
          resolve();
        }
      );
    });
  });
});
