import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureOptionsModalComponent } from './structure-options-modal.component';

describe('StructureOptionsModalComponent', () => {
  let component: StructureOptionsModalComponent;
  let fixture: ComponentFixture<StructureOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureOptionsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
