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
  @Output() public displayMapMarkerId: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Output() public hoverOut: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Output() public selectedMarkerId: EventEmitter<number> = new EventEmitter<number>();
  public showStructureDetails = false;
  public structure: Structure;

  constructor() {}
  ngOnInit(): void {}

  public fetchResults(filters: Filter[]): void {
    this.searchEvent.emit(filters);
  }
  public showDetails(event: Structure): void {
    this.showStructureDetails = true;
    this.structure = event;
    this.selectedMarkerId.emit(this.structure.id);
  }

  public closeDetails(): void {
    this.selectedMarkerId.emit();
    this.showStructureDetails = false;
  }

  public handleCardHover(event: Structure): void {
    this.displayMapMarkerId.emit([event.id]);
  }

  public mouseOut(): void {
    this.displayMapMarkerId.emit([undefined]);
  }
}
