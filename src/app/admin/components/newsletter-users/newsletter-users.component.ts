import { Component } from '@angular/core';
import { NewsletterSubscription } from '../../../models/subscription-model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-newsletter-users',
  templateUrl: './newsletter-users.component.html',
})
export class NewsletterUsersComponent {
  public subscriptions: NewsletterSubscription[];
  public deleteModalOpenned = false;
  public emailToUnsubscribe: string = null;
  public subscriptionsCount: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.countNewsletterSubscriptions().subscribe((count) => {
      this.subscriptionsCount = count;
    });
  }

  public toggleUnsubscribeModal(emailToUnsubscribe: string): void {
    this.emailToUnsubscribe = emailToUnsubscribe;
    this.deleteModalOpenned = !this.deleteModalOpenned;
  }

  public searchSubscribedEmail(searchString: string): void {
    this.adminService.searchNewsletterSubscriptions(searchString).subscribe((emails) => {
      this.subscriptions = emails;
    });
  }

  public unsubscribeEmail(email: string, shouldUnsubscribe: boolean): void {
    this.toggleUnsubscribeModal(email);
    if (shouldUnsubscribe) {
      this.adminService.unsubscribeEmail(email).subscribe((data) => {
        this.subscriptions = this.subscriptions.filter((obj) => obj.email !== email);
      });
    }
  }

  public copySubscription(): void {
    this.adminService.searchNewsletterSubscriptions('').subscribe((emails) => {
      let emailsToBeCopied = emails.map((e) => e.email).join(';');
      let copyElement = document.createElement('textarea');
      copyElement.textContent = decodeURI(emailsToBeCopied);
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(copyElement);
      copyElement.select();
      document.execCommand('copy');
      body.removeChild(copyElement);
    });
  }
}
