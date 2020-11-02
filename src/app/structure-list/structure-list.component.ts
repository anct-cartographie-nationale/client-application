import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from './models/filter.model';
import { Structure } from '../models/structure.model';
import { GeoJson } from '../map/models/geojson.model';
@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnInit {
  @Input() public structureList: Structure[];
  @Output() searchEvent = new EventEmitter();
  @Input() public location: GeoJson;

  constructor() {}
  ngOnInit(): void {}

  public fetchResults(filters: Filter[]): void {
    console.log(filters);
    this.searchEvent.emit(filters);
  }
}
