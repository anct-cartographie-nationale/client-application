import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-structure-consent',
  templateUrl: './structure-consent.component.html',
  styleUrls: ['./structure-consent.component.scss'],
})
export class StructureConsentComponent {
  @Input() structureForm: FormGroup;
  @Input() isEditMode: boolean;
  @Output() onAcceptDataBeSaved = new EventEmitter<any>();
  @Output() onAcceptOpenData = new EventEmitter<any>();

  public acceptDataBeSaved(event: boolean): void {
    this.onAcceptDataBeSaved.emit(event);
  }

  public acceptOpenData(event: boolean): void {
    this.onAcceptOpenData.emit(event);
  }
}
