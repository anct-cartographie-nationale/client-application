import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioFormComponent } from './radio-form.component';

describe('RadioFormComponent', () => {
  let component: RadioFormComponent;
  let fixture: ComponentFixture<RadioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
