import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTypePickerComponent } from './training-type-picker.component';

describe('TypePickerComponent', () => {
  let component: TrainingTypePickerComponent;
  let fixture: ComponentFixture<TrainingTypePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingTypePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTypePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
