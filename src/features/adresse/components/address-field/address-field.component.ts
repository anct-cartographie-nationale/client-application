import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddressFoundPresentation } from '../../../adresse';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-address-field',
  templateUrl: './address-field.component.html'
})
export class AddressFieldComponent implements OnInit {
  @Input() public addressSuggestions: AddressFoundPresentation[] = [];

  @Output() public readonly selectAddress: EventEmitter<AddressFoundPresentation> =
    new EventEmitter<AddressFoundPresentation>();

  @Output() public readonly resetAddress: EventEmitter<void> = new EventEmitter<void>();

  @Output() public readonly searchAddress: EventEmitter<string> = new EventEmitter<string>();

  @Input() public addressNotFound: boolean = false;

  @Input() public displayReset: boolean = false;

  @Input() public defaultValue?: string;

  formGroup: FormGroup = new FormGroup({ address: new FormControl() });

  public ngOnInit(): void {
    this.formGroup.get('address')?.setValue(this.defaultValue ?? '');
  }

  public search(addressInput: string): void {
    this.searchAddress.next(addressInput);
  }

  public setAddressSuggestion(address: AddressFoundPresentation): void {
    this.formGroup.get('address')?.setValue(address.label);
    this.searchAddress.next(address.label);
    this.selectAddress.next(address);
  }

  public trackByAddressName(_: number, address: AddressFoundPresentation): string {
    return `${address.label}-${address.context}`;
  }

  public clear() {
    this.formGroup.get('address')?.reset();
    this.resetAddress.emit();
  }
}
