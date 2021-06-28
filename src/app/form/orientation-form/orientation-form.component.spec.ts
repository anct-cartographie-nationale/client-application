import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationFormComponent } from './orientation-form.component';

describe('OrientationFormComponent', () => {
  let component: OrientationFormComponent;
  let fixture: ComponentFixture<OrientationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrientationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
