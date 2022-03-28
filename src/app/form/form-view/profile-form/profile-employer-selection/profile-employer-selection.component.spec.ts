import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmployerSelectionComponent } from './profile-employer-selection.component';

describe('ProfileEmployerSelectionComponent', () => {
  let component: ProfileEmployerSelectionComponent;
  let fixture: ComponentFixture<ProfileEmployerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmployerSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmployerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
