import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Filter } from './models/filter.model';
import { Structure } from '../models/structure.model';
import { GeoJson } from '../map/models/geojson.model';
import * as _ from 'lodash';

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
  @Output() public displayMapMarkerId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public selectedMarkerId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public updatedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();

  public showStructureDetails = false;
  public structure: Structure;
  public structuresListChunked: Structure[];
  private pageStructures = 0;
  private arrayChunked: Structure[][] = [];
  private chunck = 10;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedStructure && this.selectedStructure) {
      this.showDetails(this.selectedStructure);
    }
    if (changes.structureList) {
      this.structuresListChunked = this.chunckAnArray(this.structureList);
      document.getElementById('listCard').scrollTo(0, 0);
    }
  }
  public fetchResults(filters: Filter[]): void {
    this.searchEvent.emit(filters);
  }
  public showDetails(event: Structure): void {
    this.showStructureDetails = true;
    this.structure = event;
    this.selectedMarkerId.emit(this.structure._id);
  }

  public closeDetails(): void {
    this.selectedMarkerId.emit();
    this.showStructureDetails = false;
  }

  public handleCardHover(structure: Structure): void {
    this.displayMapMarkerId.emit(structure._id);
  }

  public mouseLeave(): void {
    this.displayMapMarkerId.emit(undefined);
  }

  public emitUpdatedStructure(s: Structure): void {
    this.updatedStructure.emit(s);
  }

  private chunckAnArray(structures: Structure[]): Structure[] {
    this.arrayChunked = [];
    this.pageStructures = 0;
    for (let i = 0; i < structures.length; i += this.chunck) {
      this.arrayChunked.push(structures.slice(i, i + this.chunck));
    }
    return this.arrayChunked[0];
  }

  public onScrollDown(event): void {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 50) {
      this.loadMoreStructures();
    }
  }
  private loadMoreStructures(): void {
    if (this.pageStructures < this.arrayChunked.length - 1) {
      this.pageStructures++;
      const newStructures = _.map(this.arrayChunked[this.pageStructures]);
      this.structuresListChunked = [...this.structuresListChunked, ...newStructures];
    }
  }
}
