import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureLabelsComponent } from './structure-labels.component';

describe('StructureLabelsComponent', () => {
  let component: StructureLabelsComponent;
  let fixture: ComponentFixture<StructureLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
