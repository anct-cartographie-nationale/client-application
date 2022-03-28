import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-training-price',
  templateUrl: './structure-training-price.component.html',
})
export class StructureTrainingPriceComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Output() radioChange = new EventEmitter<any>();
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public getStructureControl(nameControl: string): AbstractControl {
    return this.structureForm.get(nameControl);
  }
  public onRadioChange(name: string, value: boolean): void {
    this.radioChange.emit({ name, value });
  }
}
