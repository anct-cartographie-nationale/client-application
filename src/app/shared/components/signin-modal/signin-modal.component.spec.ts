import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInModalComponent } from './signin-modal.component';

describe('SignInModalComponent', () => {
  let component: SignInModalComponent;
  let fixture: ComponentFixture<SignInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
