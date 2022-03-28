import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureWifiComponent } from './structure-wifi.component';

describe('StructureWifiComponent', () => {
  let component: StructureWifiComponent;
  let fixture: ComponentFixture<StructureWifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureWifiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
