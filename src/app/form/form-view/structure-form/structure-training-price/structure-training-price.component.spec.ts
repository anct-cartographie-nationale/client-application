import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTrainingPriceComponent } from './structure-training-price.component';

describe('StructureTrainingPriceComponent', () => {
  let component: StructureTrainingPriceComponent;
  let fixture: ComponentFixture<StructureTrainingPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureTrainingPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTrainingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
