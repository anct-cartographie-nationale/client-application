import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTypePickerComponent } from './structure-type-picker.component';

describe('StructureTypePickerComponent', () => {
  let component: StructureTypePickerComponent;
  let fixture: ComponentFixture<StructureTypePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureTypePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTypePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
