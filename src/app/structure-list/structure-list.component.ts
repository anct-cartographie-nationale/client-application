import { Component, OnInit } from '@angular/core';
import { Filter } from './models/filter.model';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnInit {
  constructor() {}
  currentFilter: Filter[];
  ngOnInit(): void {}

  fetchResults(filter: Filter[]) {
    this.currentFilter = filter;
  }
}
