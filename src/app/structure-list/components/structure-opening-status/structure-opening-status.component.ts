import { Component, Input, OnInit } from '@angular/core';
import { Structure } from '../../../models/structure.model';
import { StructureService } from '../../../services/structure.service';

@Component({
  selector: 'app-structure-opening-status',
  templateUrl: './structure-opening-status.component.html',
  styleUrls: ['./structure-opening-status.component.scss'],
})
export class StructureOpeningStatusComponent implements OnInit {
  @Input() public structure: Structure;
  @Input() public isCalledByDetails: boolean;

  constructor(private structureService: StructureService) {}

  ngOnInit(): void {
    if (!this.structure.isOpen && !this.structure.openedOn.day) {
      this.structure = this.structureService.updateOpeningStructure(this.structure);
    }
  }
}
