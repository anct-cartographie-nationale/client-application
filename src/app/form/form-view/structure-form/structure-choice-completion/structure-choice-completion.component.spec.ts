import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureChoiceCompletionComponent } from './structure-choice-completion.component';

describe('StructureChoiceCompletionComponent', () => {
  let component: StructureChoiceCompletionComponent;
  let fixture: ComponentFixture<StructureChoiceCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureChoiceCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureChoiceCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
