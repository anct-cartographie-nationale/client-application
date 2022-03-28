import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureHoursComponent } from './structure-hours.component';

describe('StructureHoursComponent', () => {
  let component: StructureHoursComponent;
  let fixture: ComponentFixture<StructureHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
