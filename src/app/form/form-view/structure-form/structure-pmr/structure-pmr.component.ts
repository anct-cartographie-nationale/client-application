import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-pmr',
  templateUrl: './structure-pmr.component.html',
})
export class StructurePmrComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() isEditMode: boolean;
  @Input() isPageValid: boolean;
  @Input() nextPage: Function;
  @Output() radioChange = new EventEmitter<any>();
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public onRadioChange(name: string, value: boolean): void {
    this.radioChange.emit({ name, value });
  }
}
