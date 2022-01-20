import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactMessage } from '../models/contact-message.model';
import { AuthService } from '../services/auth.service';
import { ContactService } from '../services/contact.service';
import { NotificationService } from '../services/notification.service';
import { CustomRegExp } from '../utils/CustomRegExp';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    public utils: Utils
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [
        this.isLoggedIn ? this.displayFullname : '',
        [Validators.required, Validators.pattern(CustomRegExp.TEXT_WITHOUT_NUMBER)],
      ],
      phone: ['', [Validators.pattern(CustomRegExp.PHONE)]],
      email: [this.isLoggedIn ? this.displayEmail : '', [Validators.required, Validators.pattern(CustomRegExp.EMAIL)]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  public get displayFullname(): string {
    return this.authService.getUsernameDisplay() + ' ' + this.authService.getUsersurnameDisplay();
  }
  public get displayEmail(): string {
    return this.authService.getUserEmailDisplay();
  }

  public onSubmit(): void {
    if (!this.contactForm.valid) {
      return;
    }
    this.loading = true;

    let contactMessage: ContactMessage = this.contactForm.value;
    this.contactService.sendMessage(contactMessage).subscribe(
      () => {
        this.loading = false;
        this.notificationService.showSuccess('Votre message a bien été envoyé', 'Demande de contact');
        this.router.navigate(['']);
      },
      () => {
        this.loading = false;
        this.notificationService.showError(
          'Merci de réessayer plus tard',
          "Votre demande de contact n'a pas pu être envoyée"
        );
      }
    );
  }
}
