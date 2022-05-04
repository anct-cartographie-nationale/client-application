import { TestBed } from '@angular/core/testing';

import { GeojsonService } from './geojson.service';
import { HttpClientModule } from '@angular/common/http';

describe('GeojsonService', () => {
  let service: GeojsonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeojsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
