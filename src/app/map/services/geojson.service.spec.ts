import { TestBed } from '@angular/core/testing';
import { Address } from '../models/address.model';

import { GeojsonService } from './geojson.service';

describe('GeojsonService', () => {
  let service: GeojsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeojsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get address for id 26061 ', () => {
    service.getAddress(26061).subscribe((val) => {
      expect(val.zipcode).toEqual('69800');
      expect(val.text).toEqual('13ème Rue Cité Berliet');
    });
  });

  it('should get coord with query string avenue foch 69006 ', () => {
    service.getCoord(new Address({ text: 'avenue foch', citycode: '69006' })).subscribe((val) => {
      expect(val.geometry.getLat()).toEqual(4.8429024);
      expect(val.geometry.getLon()).toEqual(45.7733884);
    });
  });
});
