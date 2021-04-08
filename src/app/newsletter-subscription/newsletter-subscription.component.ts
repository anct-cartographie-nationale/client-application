import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsletterService } from '../services/newsletter.service';
import { CustomRegExp } from '../utils/CustomRegExp';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss'],
})
export class NewsletterSubscriptionComponent implements OnInit {
  public subscriptionForm: FormGroup;
  public loading = false;
  public submitted = false;
  public subscriptionFailed = false;
  public subscriptionMod: boolean;

  constructor(private formBuilder: FormBuilder, private newsletterService: NewsletterService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(CustomRegExp.EMAIL)]],
    });
    if (this.router.url === '/newsletter') {
      this.subscriptionMod = true;
    }
    if (this.router.url === '/newsletter-unsubscription') {
      this.subscriptionMod = false;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.subscriptionForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.subscriptionForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.subscriptionMod) {
      this.newsletterService.newsletterSubscribe(this.f.email.value).subscribe(
        () => {
          this.router.navigate(['']);
        },
        () => {
          this.loading = false;
          this.subscriptionFailed = true;
        }
      );
    }
    if (!this.subscriptionMod) {
      this.newsletterService.newsletterUnsubscribe(this.f.email.value).subscribe(
        () => {
          this.router.navigate(['']);
        },
        () => {
          this.loading = false;
          this.subscriptionFailed = true;
        }
      );
    }
  }
}
