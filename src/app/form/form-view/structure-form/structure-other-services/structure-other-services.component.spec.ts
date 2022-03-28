import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureOtherServicesComponent } from './structure-other-services.component';

describe('StructureOtherServicesComponent', () => {
  let component: StructureOtherServicesComponent;
  let fixture: ComponentFixture<StructureOtherServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureOtherServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureOtherServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
