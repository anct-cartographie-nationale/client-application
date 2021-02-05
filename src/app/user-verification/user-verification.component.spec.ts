import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserVerificationComponent } from './user-verification.component';

describe('UserVerificationComponent', () => {
  let component: UserVerificationComponent;
  let fixture: ComponentFixture<UserVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserVerificationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
