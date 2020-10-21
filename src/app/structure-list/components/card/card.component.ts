import { Component, Input, OnInit } from '@angular/core';
import { Structure } from '../../../models/structure.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public structure: Structure;
  constructor() {}

  ngOnInit(): void {}
}
