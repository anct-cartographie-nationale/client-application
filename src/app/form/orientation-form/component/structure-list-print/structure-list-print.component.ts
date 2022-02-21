import { Component, Input, OnInit } from '@angular/core';
import { Structure } from '../../../../models/structure.model';
import * as _ from 'lodash';
import { Filter } from '../../../../structure-list/models/filter.model';
@Component({
  selector: 'app-structure-list-print',
  templateUrl: './structure-list-print.component.html',
  styleUrls: ['./structure-list-print.component.scss'],
})
export class StructureListPrintComponent {
  @Input() public structures: Structure[];
  @Input() public filters: Filter[];
  @Input() public beneficiaryNeedCommentary: string;
  @Input() public beneficiaryName: string;
  @Input() public structureAccompaniment: string;
  @Input() public beneficiaryPassNumeric: boolean;
  @Input() public contactAccompaniment: string;
}
