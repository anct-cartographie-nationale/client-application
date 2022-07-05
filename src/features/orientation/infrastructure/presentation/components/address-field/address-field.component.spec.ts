import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressFieldComponent } from './address-field.component';
import { DropdownPaneStubComponent } from '../../test-doubles';

describe('AddressFieldComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AddressFieldComponent, DropdownPaneStubComponent]
    })
      .compileComponents()
      .catch((): void => {
        throw new Error('AddressFieldComponent');
      });
  });

  it('should create component', (): void => {
    const fixture: ComponentFixture<AddressFieldComponent> = TestBed.createComponent(AddressFieldComponent);
    const component: AddressFieldComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
