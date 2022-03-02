import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShareConsentComponent } from './data-share-consent.component';

describe('DataShareConsentComponent', () => {
  let component: DataShareConsentComponent;
  let fixture: ComponentFixture<DataShareConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataShareConsentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataShareConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
