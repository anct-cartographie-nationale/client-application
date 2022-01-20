import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ManageUsersComponent } from './manage-users.component';

describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;
  let USERS;
  let service;

  beforeEach(async () => {
    USERS = [
      { email: 'paula@test.com', name: 'paula' },
      { email: 'jeanpaul@test.com', name: 'jeanpaul' },
      { email: 'admin@test.com', name: 'admin' },
    ];
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ManageUsersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = jasmine.createSpyObj(['searchUsers', 'manageUsers']);
    component = new ManageUsersComponent(service, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should searchUsers', () => {
    let searchString = 'paula';
    service.searchUsers.and.returnValue(of(USERS.filter((item) => item.email.indexOf(searchString) !== -1)));
    component.users = USERS;
    component.searchUsers(searchString);
    expect(component.users.length).toBe(1);
  });

  it('should searchUsers all users', () => {
    let searchString = '';
    service.searchUsers.and.returnValue(of(USERS.filter((item) => item.email.indexOf(searchString) !== -1)));
    component.users = USERS;
    component.searchUsers(searchString);
    expect(component.users.length).toBe(USERS.length);
  });

  it('should delete user', () => {
    component.users = USERS;
    service.deleteUser.and.returnValue(
      of(
        USERS.splice(
          USERS.findIndex((e) => e.email === USERS[0].email),
          1
        )
      )
    );
    component.deleteUser(component.users[0], true);
    expect(component.users.length).toBe(2);
  });
});
