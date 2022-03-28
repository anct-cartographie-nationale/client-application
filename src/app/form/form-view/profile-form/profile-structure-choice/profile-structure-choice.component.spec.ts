import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStructureChoiceComponent } from './profile-structure-choice.component';

describe('ProfileStructureChoiceComponent', () => {
  let component: ProfileStructureChoiceComponent;
  let fixture: ComponentFixture<ProfileStructureChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStructureChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStructureChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
