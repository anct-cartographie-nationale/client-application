import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureConsentComponent } from './structure-consent.component';

describe('StructureConsentComponent', () => {
  let component: StructureConsentComponent;
  let fixture: ComponentFixture<StructureConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
