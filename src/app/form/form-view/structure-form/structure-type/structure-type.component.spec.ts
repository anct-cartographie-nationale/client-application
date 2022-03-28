import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTypeComponent } from './structure-type.component';

describe('StructureTypeComponent', () => {
  let component: StructureTypeComponent;
  let fixture: ComponentFixture<StructureTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
