import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureContactCompletionComponent } from './structure-contact-completion.component';

describe('StructureContactCompletionComponent', () => {
  let component: StructureContactCompletionComponent;
  let fixture: ComponentFixture<StructureContactCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureContactCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureContactCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
