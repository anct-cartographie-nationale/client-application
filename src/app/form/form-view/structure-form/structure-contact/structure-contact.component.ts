import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Utils } from '../../../../utils/utils';

@Component({
  selector: 'app-structure-contact',
  templateUrl: './structure-contact.component.html',
})
export class StructureContactComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Output() validateForm = new EventEmitter<any>();

  constructor(public utils: Utils) {}

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public setValidationsForm(): void {
    this.validateForm.emit();
  }
}
