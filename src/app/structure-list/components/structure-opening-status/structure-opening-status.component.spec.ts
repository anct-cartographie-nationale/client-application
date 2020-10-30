import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureOpeningStatusComponent } from './structure-opening-status.component';

describe('StructureOpeningStatusComponent', () => {
  let component: StructureOpeningStatusComponent;
  let fixture: ComponentFixture<StructureOpeningStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureOpeningStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureOpeningStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
