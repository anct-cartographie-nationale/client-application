import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureListComponent } from './structure-list.component';

describe('StructureListComponent', () => {
  let component: StructureListComponent;
  let fixture: ComponentFixture<StructureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
