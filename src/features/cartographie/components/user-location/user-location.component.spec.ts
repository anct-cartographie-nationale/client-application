import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressPresenter } from '../../../adresse';
import { AddressFieldStubComponent } from '../../../adresse/test-doubles';
import { MarkersPresenter } from '../../presenters';
import { UserLocationComponent } from './user-location.component';

describe('UserLocationComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [UserLocationComponent, AddressFieldStubComponent],
      providers: [
        {
          provide: AddressPresenter,
          useValue: {}
        },
        {
          provide: MarkersPresenter,
          useValue: {}
        }
      ]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('UserLocationComponent');
      });
  });

  it('should create the component', (): void => {
    const fixture: ComponentFixture<UserLocationComponent> = TestBed.createComponent(UserLocationComponent);
    const userLocationComponent: UserLocationComponent = fixture.componentInstance;
    expect(userLocationComponent).toBeTruthy();
  });
});
