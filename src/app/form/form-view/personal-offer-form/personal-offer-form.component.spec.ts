import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOfferFormComponent } from './personal-offer-form.component';

describe('PersonalOfferFormComponent', () => {
  let component: PersonalOfferFormComponent;
  let fixture: ComponentFixture<PersonalOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalOfferFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
