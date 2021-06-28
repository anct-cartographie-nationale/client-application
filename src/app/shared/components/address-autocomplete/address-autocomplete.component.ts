import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss'],
})
export class AddressAutocompleteComponent implements OnInit {
  public readonly AUTOCOMPLETE_NBR = 5;
  public data = [];
  public isAlreadySearching = false;
  @ViewChild('searchAddress', { static: true }) searchAddress: ElementRef;
  @Output() selectedAddress: EventEmitter<Address> = new EventEmitter<Address>();
  @Output() inputAddress: EventEmitter<any> = new EventEmitter<any>();
  @Input() private address?: Address;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    if (this.address) {
      let address_str = null;
      if (this.address.numero) {
        address_str = this.address.numero + ' ' + this.address.street + ' ' + this.address.commune;
      } else {
        address_str = this.address.street + ' ' + this.address.commune;
      }
      this.searchAddress.nativeElement.value = address_str;
    }
  }

  ngOnChanges(): void {
    if (this.address) {
      let address_str = null;
      if (this.address.numero) {
        address_str = this.address.numero + ' ' + this.address.street + ' ' + this.address.commune;
      } else {
        address_str = this.address.street + ' ' + this.address.commune;
      }
      this.searchAddress.nativeElement.value = address_str;
    }
  }

  public onSearchChange(searchString: string) {
    if (!this.isAlreadySearching) {
      this.isAlreadySearching = true;
      this.addressService.searchAddress(searchString).subscribe((data) => {
        this.data = data.features;
        this.isAlreadySearching = false;
      });
    }
    this.inputAddress.emit();
  }

  public selectedResult(hit: any): void {
    const address = new Address();
    address.numero = hit.properties.housenumber ? hit.properties.housenumber : null;
    address.street = hit.properties.street;
    address.commune = hit.properties.city;
    const value = this.parseHitToAddress(hit);
    // Set input value
    this.searchAddress.nativeElement.value = value;
    // Reset autocomplete
    this.data = [];
    // Emit choosen value
    this.selectedAddress.emit(address);
  }

  public parseHitToAddress(hit: any): string {
    if (hit.properties.housenumber) {
      return `${hit.properties.housenumber} ${hit.properties.street} ${hit.properties.city}`;
    }
    return `${hit.properties.street} ${hit.properties.city}`;
  }
}
