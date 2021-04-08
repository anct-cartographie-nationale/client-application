import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterUsersComponent } from './newsletter-users.component';

describe('DeleteUserComponent', () => {
  let component: NewsletterUsersComponent;
  let fixture: ComponentFixture<NewsletterUsersComponent>;
  let USERS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NewsletterUsersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
