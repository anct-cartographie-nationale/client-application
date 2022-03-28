import { TestBed } from '@angular/core/testing';

import { PersonalOfferService } from './personal-offer.service';

describe('PersonalOfferService', () => {
  let service: PersonalOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
