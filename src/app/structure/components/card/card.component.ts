import { Component, OnInit } from '@angular/core';
import { Structure } from '../../models/structure.model';
import { StructureService } from '../../services/structure.service';
const { DateTime } = require('luxon');

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  structures: Structure[] = [];
  constructor(private _structureService: StructureService) {}

  ngOnInit(): void {
    var dt = DateTime.local();
    this._structureService.recupererStructures().subscribe((structures: Structure[]) => {
      structures.forEach((s: Structure) => {
        this.structures.push(this._structureService.majOuvertureStructure(s, dt));
      });
    });
  }
}
