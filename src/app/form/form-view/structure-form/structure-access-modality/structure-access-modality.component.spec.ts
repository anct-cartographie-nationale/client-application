import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAccessModalityComponent } from './structure-access-modality.component';

describe('StructureAccessModalityComponent', () => {
  let component: StructureAccessModalityComponent;
  let fixture: ComponentFixture<StructureAccessModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureAccessModalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAccessModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
