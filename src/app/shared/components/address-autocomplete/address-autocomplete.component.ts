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
  public isAlreadySearch = false;
  @ViewChild('searchAddress', { static: true }) searchAddress: ElementRef;
  @Output() selectedAddress: EventEmitter<Address> = new EventEmitter<Address>();
  @Output() inputAddress: EventEmitter<any> = new EventEmitter<any>();
  @Input() private address?: Address;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    if (this.address) {
      const address_str = this.address.numero + ' ' + this.address.street + ' ' + this.address.commune;
      this.searchAddress.nativeElement.value = address_str;
    }
  }
  public onSearchChange(searchString: string) {
    if (!this.isAlreadySearch) {
      this.isAlreadySearch = true;
      this.addressService.searchAddress(searchString).subscribe((data) => {
        this.data = data.hits.hits.slice(0, this.AUTOCOMPLETE_NBR);
        this.isAlreadySearch = false;
      });
    }
    this.inputAddress.emit();
  }

  public selectedResult(hit: any): void {
    const address = new Address();
    address.numero = hit._source['data-fr'].properties.numero_str;
    address.street = hit._source['data-fr'].properties.voie_str;
    address.commune = hit._source['data-fr'].properties.commune_str;
    const value = this.parseHitToAddress(hit);
    // Set input value
    this.searchAddress.nativeElement.value = value;
    // Reset autocomplete
    this.data = [];
    // Emit choosen value
    this.selectedAddress.emit(address);
  }

  public parseHitToAddress(hit: any): string {
    return `${hit._source['data-fr'].properties.numero_str} ${hit._source['data-fr'].properties.voie_str} ${hit._source['data-fr'].properties.commune_str}`;
  }
}
