import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-type',
  templateUrl: './structure-type.component.html',
})
export class StructureTypeComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() isEditMode;
  @Output() typeStructure = new EventEmitter<string>();
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public setTypeStructure(value) {
    this.typeStructure.emit(value);
  }
}
