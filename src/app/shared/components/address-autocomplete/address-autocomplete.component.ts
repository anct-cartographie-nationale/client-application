import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss'],
})
export class AddressAutocompleteComponent {
  public readonly AUTOCOMPLETE_NBR = 5;
  public data = [];
  @ViewChild('searchAddress', { static: true }) searchAddress: ElementRef;
  @Output() selectedAddress: EventEmitter<string> = new EventEmitter<string>();

  constructor(private addressService: AddressService) {}

  public onSearchChange(searchString: string) {
    this.addressService.searchAddress(searchString).subscribe((data) => {
      this.data = data.hits.hits.slice(0, this.AUTOCOMPLETE_NBR);
    });
  }

  public selectedResult(hit: any): void {
    const value = this.parseHitToAddress(hit);
    // Set input value
    this.searchAddress.nativeElement.value = value;
    // Reset autocomplete
    this.data = [];
    // Emit choosen value
    this.selectedAddress.emit(value);
  }

  public parseHitToAddress(hit: any): string {
    return `${hit._source['data-fr'].properties.numero_str} ${hit._source['data-fr'].properties.voie_str} ${hit._source['data-fr'].properties.commune_str}`;
  }
}
