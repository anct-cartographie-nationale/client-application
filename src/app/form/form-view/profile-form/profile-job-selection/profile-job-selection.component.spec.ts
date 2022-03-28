import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileJobSelectionComponent } from './profile-job-selection.component';

describe('ProfileJobSelectionComponent', () => {
  let component: ProfileJobSelectionComponent;
  let fixture: ComponentFixture<ProfileJobSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileJobSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileJobSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
