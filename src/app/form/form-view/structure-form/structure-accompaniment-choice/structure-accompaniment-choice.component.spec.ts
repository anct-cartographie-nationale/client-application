import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAccompanimentChoiceComponent } from './structure-accompaniment-choice.component';

describe('StructureAccompanimentChoiceComponent', () => {
  let component: StructureAccompanimentChoiceComponent;
  let fixture: ComponentFixture<StructureAccompanimentChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureAccompanimentChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAccompanimentChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
