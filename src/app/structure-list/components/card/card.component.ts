import { Component, OnInit } from '@angular/core';
import { Structure } from '../../models/structure.model';
import { StructureService } from '../../services/structure-list.service';
const { DateTime } = require('luxon');

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  structures: Structure[] = [];
  constructor(private structureService: StructureService) {}

  ngOnInit(): void {
    this.structureService.getStructures().subscribe((structures) => {
      structures.forEach((s: Structure) => {
        this.structures.push(this.structureService.updateOpeningStructure(s, DateTime.local()));
      });
    });
  }
}
