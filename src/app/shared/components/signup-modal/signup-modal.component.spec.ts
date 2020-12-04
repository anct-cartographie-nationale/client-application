import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpModalComponent } from './signup-modal.component';

describe('SignUpModalComponent', () => {
  let component: SignUpModalComponent;
  let fixture: ComponentFixture<SignUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
