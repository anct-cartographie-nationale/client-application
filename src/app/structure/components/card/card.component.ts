import { Component, OnInit } from '@angular/core';
import { Structure } from '../../models/structure.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  structure: Structure[] = [];
  servicesProposes: any = [
    { val: 'CAF', text: 'Droits à la CAF' },
    { val: 'Pôle Emploi', text: 'Droits à Pôle Emploi' },
    { val: 'Impôts', text: 'Droits aux Impots' },
    { val: 'CPAM', text: 'Droits à la CPAM (AMELI)' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
