import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOfferAccompanimentComponent } from './personal-offer-accompaniment.component';

describe('PersonalOfferAccompanimentComponent', () => {
  let component: PersonalOfferAccompanimentComponent;
  let fixture: ComponentFixture<PersonalOfferAccompanimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalOfferAccompanimentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOfferAccompanimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
