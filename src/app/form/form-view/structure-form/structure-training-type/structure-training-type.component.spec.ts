import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTrainingTypeComponent } from './structure-training-type.component';

describe('StructureTrainingTypeComponent', () => {
  let component: StructureTrainingTypeComponent;
  let fixture: ComponentFixture<StructureTrainingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureTrainingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTrainingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
