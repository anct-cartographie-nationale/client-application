import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOfferTrainingTypeComponent } from './personal-offer-training-type.component';

describe('PersonalOfferTrainingTypeComponent', () => {
  let component: PersonalOfferTrainingTypeComponent;
  let fixture: ComponentFixture<PersonalOfferTrainingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalOfferTrainingTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOfferTrainingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
