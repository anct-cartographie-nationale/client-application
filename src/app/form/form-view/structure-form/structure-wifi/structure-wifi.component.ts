import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-wifi',
  templateUrl: './structure-wifi.component.html',
})
export class StructureWifiComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Input() isEditMode: boolean;
  @Input() isWifiChoosen: boolean;
  @Output() validateForm = new EventEmitter<any>();
  @Output() inArray = new EventEmitter<any>();
  @Output() checkChange = new EventEmitter<any>();

  ngOnInit(): void {
    this.validateForm.emit();
  }

  public isInArray(accessModalityId: string, modality: string) {
    this.inArray.emit({ formControlName: accessModalityId, value: modality });
  }
  public onCheckChange(event, catId: string, modId: string): void {
    this.checkChange.emit({ event, formControlName: catId, value: modId });
  }
}
