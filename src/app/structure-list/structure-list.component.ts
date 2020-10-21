import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from './models/filter.model';
import { Structure } from '../models/structure.model';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnInit {
  @Input() public structureList: Structure[];
  @Output() searchEvent = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  fetchResults(filters: Filter[]) {
    this.searchEvent.emit(filters);
  }
}
