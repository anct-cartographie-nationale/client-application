import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-covid-info',
  templateUrl: './structure-covid-info.component.html',
  styleUrls: ['./structure-covid-info.component.scss'],
})
export class StructureCovidInfoComponent {
  @Input() structureForm: FormGroup;
  @Input() isEditMode: boolean;

  public getStructureControl(nameControl: string): AbstractControl {
    return this.structureForm.get(nameControl);
  }
}
