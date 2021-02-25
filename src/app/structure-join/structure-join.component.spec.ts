import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureJoinComponent } from './structure-join.component';

describe('StructureJoinComponent', () => {
  let component: StructureJoinComponent;
  let fixture: ComponentFixture<StructureJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
