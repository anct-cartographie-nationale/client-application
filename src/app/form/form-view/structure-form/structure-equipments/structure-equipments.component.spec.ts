import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureEquipmentsComponent } from './structure-equipments.component';

describe('StructureEquipmentsComponent', () => {
  let component: StructureEquipmentsComponent;
  let fixture: ComponentFixture<StructureEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureEquipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
