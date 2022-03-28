import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePublicTargetComponent } from './structure-public-target.component';

describe('StructurePublicTargetComponent', () => {
  let component: StructurePublicTargetComponent;
  let fixture: ComponentFixture<StructurePublicTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructurePublicTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructurePublicTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
