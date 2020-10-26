import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Structure } from '../models/structure.model';
import { StructureService } from '../services/structure-list.service';
import { Filter } from '../structure-list/models/filter.model';
const { DateTime } = require('luxon');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public structures: Structure[] = [];
  constructor(private structureService: StructureService) {}

  ngOnInit(): void {
    this.structureService.getStructures(null).subscribe((structures) => {
      this.structures = structures.map((structure) =>
        this.structureService.updateOpeningStructure(structure, DateTime.local())
      );
    });
  }

  public fetchResults(filters: Filter[]): void {
    this.structureService.getStructures(filters).subscribe((structures) => {
      this.structures = structures.map((structure) =>
        this.structureService.updateOpeningStructure(structure, DateTime.local())
      );
    });
  }
}
