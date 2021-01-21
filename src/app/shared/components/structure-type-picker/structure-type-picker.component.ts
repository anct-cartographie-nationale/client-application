import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-structure-type-picker',
  templateUrl: './structure-type-picker.component.html',
  styleUrls: ['./structure-type-picker.component.scss'],
})
export class StructureTypePickerComponent implements OnInit {
  public pickedType: string;
  @Input() public pickedChoice?: string;
  @Output() selectedType: EventEmitter<string> = new EventEmitter<string>();

  public type_data = [
    {
      name: 'Publique',
      logo: 'typeStructure_public',
      choices: [
        'Mairie',
        'CAF',
        'CCAS',
        'Maison de la métropole',
        'CARSAT',
        'Médiathèque/Bibliothèque',
        'Pôle Emploi',
        'Préfecture',
        'BIJ/PIJ',
      ],
    },
    {
      name: 'Privée à but non lucratif',
      logo: 'typeStructure_private',
      choices: [
        'Association',
        'Centre socio-culturel',
        'MJC / Cyberbase',
        'PIMMS',
        'Structure information jeunesse (SIJ)',
        'Missions locales ',
      ],
    },
    {
      name: 'Privée à but lucratif',
      logo: 'typeStructure_privateLucratif',
      choices: ['Structure de formation', "Structure d'insertion"],
    },
  ];
  constructor() {}

  ngOnInit() {
    if (this.pickedChoice) {
      this.pickedType = this.getType(this.pickedChoice);
    }
  }

  getType(nameChoice: string): string {
    return this.type_data.filter((type) => {
      if (type.choices.includes(nameChoice)) {
        return type.name;
      }
    })[0].name;
  }
  getChoices(nameType: string): string[] {
    return this.type_data.filter((type) => {
      if (type.name == nameType) {
        return type.choices;
      }
    })[0].choices;
  }
  pickType(type: string): void {
    this.pickedType = type;
  }
  pickChoice(choice: string): void {
    this.pickedChoice = choice;
    this.selectedType.emit(choice);
  }
}
