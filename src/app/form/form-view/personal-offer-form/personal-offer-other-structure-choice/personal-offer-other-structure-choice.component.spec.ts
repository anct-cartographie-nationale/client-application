import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOfferOtherStructureChoiceComponent } from './personal-offer-other-structure-choice.component';

describe('PersonalOfferOtherStructureChoiceComponent', () => {
  let component: PersonalOfferOtherStructureChoiceComponent;
  let fixture: ComponentFixture<PersonalOfferOtherStructureChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalOfferOtherStructureChoiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOfferOtherStructureChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
