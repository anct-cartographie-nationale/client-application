import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DeleteUserComponent } from './delete-user.component';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;
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
      declarations: [DeleteUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = jasmine.createSpyObj(['searchUsers', 'deleteUser']);
    component = new DeleteUserComponent(service);
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
    component.deleteUser(component.users[0]);
    expect(component.users.length).toBe(2);
  });
});
