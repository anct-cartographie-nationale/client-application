import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePmrComponent } from './structure-pmr.component';

describe('StructurePmrComponent', () => {
  let component: StructurePmrComponent;
  let fixture: ComponentFixture<StructurePmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructurePmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructurePmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
