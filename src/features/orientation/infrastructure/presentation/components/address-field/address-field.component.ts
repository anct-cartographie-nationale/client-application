import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddressFoundPresentation } from '../../../../domain/presenters/address/address-found.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-address-field',
  templateUrl: './address-field.component.html'
})
export class AddressFieldComponent {
  @Input() public addressSuggestions: AddressFoundPresentation[] = [];

  @Output() public readonly selectAddress: EventEmitter<AddressFoundPresentation> =
    new EventEmitter<AddressFoundPresentation>();

  @Output() public readonly searchAddress: EventEmitter<string> = new EventEmitter<string>();

  @Input() public addressNotFound: boolean = false;

  public readonly searchForm: FormGroup = new FormGroup({
    address: new FormControl('')
  });

  public search(addressInput: string): void {
    this.searchAddress.next(addressInput);
  }

  public setAddressSuggestion(address: AddressFoundPresentation): void {
    this.searchForm.setValue({ address: address.label });
    this.searchAddress.next(address.label);
    this.selectAddress.next(address);
  }

  public trackByAddressName(_: number, address: AddressFoundPresentation): string {
    return `${address.label}-${address.context}`;
  }
}
