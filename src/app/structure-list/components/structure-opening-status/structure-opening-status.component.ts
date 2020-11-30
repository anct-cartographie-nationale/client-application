import { Component, Input, OnInit } from '@angular/core';
import { Structure } from '../../../models/structure.model';

@Component({
  selector: 'app-structure-opening-status',
  templateUrl: './structure-opening-status.component.html',
  styleUrls: ['./structure-opening-status.component.scss'],
})
export class StructureOpeningStatusComponent implements OnInit {
  @Input() public structure: Structure;
  @Input() public isCalledByDetails: boolean;

  constructor() {}

  ngOnInit(): void {}
}
