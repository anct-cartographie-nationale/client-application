import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-accompaniment-choice',
  templateUrl: './structure-accompaniment-choice.component.html',
})
export class StructureAccompanimentChoiceComponent implements OnInit {
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
