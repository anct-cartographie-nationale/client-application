import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../validator/form';

import { CreateAccountFormComponent } from './create-account-form.component';

describe('CreateAccountFormComponent', () => {
  let component: CreateAccountFormComponent;
  let fixture: ComponentFixture<CreateAccountFormComponent>;
  const accountForm = new FormGroup(
    {
      email: new FormControl('test@test.fr', Validators.required),
      password: new FormControl('Testaze123!', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
      ]),
      confirmPassword: new FormControl('Testaze123!'),
    },
    [MustMatch('password', 'confirmPassword')]
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the form', () => {
    spyOn(component.submitForm, 'emit');
    component.onSubmit(accountForm);
    expect(component.submitForm.emit).toHaveBeenCalled();
    expect(component.submitForm.emit).toHaveBeenCalledWith(accountForm);
  });

  it('should return control', () => {
    component.accountForm = accountForm;
    const result = component.getAccountControl('email');
    const control = accountForm.get('email');
    expect(result).toEqual(control);
  });
});
