import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-description',
  templateUrl: './structure-description.component.html',
  styleUrls: ['./structure-description.component.scss'],
})
export class StructureDescriptionComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() isEditMode: boolean;
  @Output() validateForm = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public getStructureControl(nameControl: string): AbstractControl {
    return this.structureForm.get(nameControl);
  }
}
