import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address } from '../../../../models/address.model';

@Component({
  selector: 'app-structure-name-and-address',
  templateUrl: './structure-name-and-address.component.html',
  styleUrls: ['./structure-name-and-address.component.scss'],
})
export class StructureNameAndAddressComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Output() validateForm = new EventEmitter<any>();
  @Output() addressStructure = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public setValidationsForm() {
    this.validateForm.emit();
  }

  public setAddressStructure(address?: Address) {
    this.addressStructure.emit(address);
  }
}
