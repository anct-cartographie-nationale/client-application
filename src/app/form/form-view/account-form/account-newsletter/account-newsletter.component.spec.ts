import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewsletterComponent } from './account-newsletter.component';

describe('AccountNewsletterComponent', () => {
  let component: AccountNewsletterComponent;
  let fixture: ComponentFixture<AccountNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNewsletterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
