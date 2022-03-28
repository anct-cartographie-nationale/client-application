import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDescriptionComponent } from './structure-description.component';

describe('StructureDescriptionComponent', () => {
  let component: StructureDescriptionComponent;
  let fixture: ComponentFixture<StructureDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
