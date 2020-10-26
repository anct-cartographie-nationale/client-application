import { Component, Input, OnInit } from '@angular/core';
import { Structure } from '../models/structure.model';
import { GeoJson } from '../map/models/geojson.model';
@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.scss'],
})
export class StructureListComponent implements OnInit {
  @Input() public structureList: Structure[];
  @Input() public location: GeoJson;
  constructor() {}

  ngOnInit(): void {}
}
