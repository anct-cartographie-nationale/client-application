import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-contact-completion',
  templateUrl: './structure-contact-completion.component.html',
})
export class StructureContactCompletionComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() isEditMode: boolean;
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public setValidationsForm(): void {
    this.validateForm.emit();
  }
}
