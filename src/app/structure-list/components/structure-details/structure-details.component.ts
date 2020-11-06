import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from '../../../models/structure.model';
import { AccessModality } from '../../enum/access-modality.enum';
@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.scss'],
})
export class StructureDetailsComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public closeDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  public accessModality = AccessModality;

  constructor() {}

  ngOnInit(): void {}

  public close(): void {
    this.closeDetails.emit(true);
  }

  public getAccessIcon(accessModality: AccessModality): string {
    switch (accessModality) {
      case AccessModality.free:
        return 'group';
      case AccessModality.meeting:
        return 'calendar';
      case AccessModality.numeric:
        return 'tel';
      default:
        throw new Error(`${accessModality} is not handled by getAccessIcon`);
    }
  }

  public keepOriginalOrder = (a, b) => a.key;
}
