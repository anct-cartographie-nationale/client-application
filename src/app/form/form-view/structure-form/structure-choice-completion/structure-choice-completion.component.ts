import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-choice-completion',
  templateUrl: './structure-choice-completion.component.html',
})
export class StructureChoiceCompletionComponent {
  @Input() structureForm: FormGroup;
  @Output() radioChange = new EventEmitter<any>();
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public onRadioChange(name: string, value: boolean): void {
    this.radioChange.emit({ name, value });
  }
}
