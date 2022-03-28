import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationStepComponent } from './information-step.component';

describe('InformationStepComponent', () => {
  let component: InformationStepComponent;
  let fixture: ComponentFixture<InformationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
