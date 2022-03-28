import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureNameAndAddressComponent } from './structure-name-and-address.component';

describe('StructureNameAndAddressComponent', () => {
  let component: StructureNameAndAddressComponent;
  let fixture: ComponentFixture<StructureNameAndAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureNameAndAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureNameAndAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
