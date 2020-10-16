import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnInit {
  constructor() {}
  currentFilter: string;
  ngOnInit(): void {}

  fetchResults(filter: string) {
    this.currentFilter = filter;
  }
}
