import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() public displayMapMarkerId: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Output() public hoverOut: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  public showStructureDetails = false;
  public structure: Structure;
  constructor() {}

  ngOnInit(): void {}

  public showDetails(event: Structure): void {
    this.showStructureDetails = true;
    this.structure = event;
    // this.displayMapMarkerId.emit([this.structure.id]);
  }

  public closeDetails(): void {
    // this.displayMapMarkerId.emit([]);
    this.showStructureDetails = false;
  }

  public handleCardHover(event: Structure): void {
    this.displayMapMarkerId.emit([event.id]);
  }

  public mouseOut(): void {
    this.displayMapMarkerId.emit([undefined]);
  }
}
