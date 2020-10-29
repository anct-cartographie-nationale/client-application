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
  public showStructureDetails = false;
  public structure: Structure[];
  constructor() {}

  ngOnInit(): void {}

  public showDetails(event): void {
    this.showStructureDetails = true;
    this.structure = event;
  }

  public closeDetails(): void {
    this.showStructureDetails = false;
  }
}
