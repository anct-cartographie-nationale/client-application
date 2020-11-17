import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Filter } from './models/filter.model';
import { Structure } from '../models/structure.model';
import { GeoJson } from '../map/models/geojson.model';
@Component({
  selector: 'app-structure-list',
  templateUrl: './structure-list.component.html',
  styleUrls: ['./structure-list.component.scss'],
})
export class StructureListComponent implements OnChanges {
  @Input() public structureList: Structure[];
  @Output() searchEvent = new EventEmitter();
  @Input() public location: GeoJson;
  @Input() public selectedStructure: Structure = new Structure();
  @Output() public displayMapMarkerId: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Output() public hoverOut: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Output() public selectedMarkerId: EventEmitter<number> = new EventEmitter<number>();
  @Output() loadMoreStructures = new EventEmitter();
  public showStructureDetails = false;
  public structure: Structure;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedStructure && this.selectedStructure) {
      this.showDetails(this.selectedStructure);
    }
  }
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

  public onScrollDown(event): void {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) {
      console.log('loading...');
    }
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 50) {
      this.loadMoreStructures.emit();
    }
  }
}
