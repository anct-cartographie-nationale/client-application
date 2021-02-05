import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StructureType } from '../../../models/structure-type.model';
import { StructureTypeService } from '../../../services/structure-type.service';

export enum structureTypes {
  public = 'Publique',
  private = 'Privée à but non lucratif',
  privateLucratif = 'Privée à but lucratif',
}

@Component({
  selector: 'app-structure-type-picker',
  templateUrl: './structure-type-picker.component.html',
  styleUrls: ['./structure-type-picker.component.scss'],
})
export class StructureTypePickerComponent implements OnInit {
  public pickedType: string;
  public structureTypes: StructureType[];
  @Input() public pickedChoice?: string;
  @Output() selectedType: EventEmitter<string> = new EventEmitter<string>();

  constructor(private structureTypeService: StructureTypeService) {}

  ngOnInit() {
    if (this.pickedChoice) {
      this.pickedType = this.getType(this.pickedChoice);
    }
    this.structureTypeService.getStructureTypes().subscribe((types) => {
      this.structureTypes = types;
    });
  }

  public getType(nameChoice: string): string {
    return this.structureTypes.filter((type) => {
      if (type.values.includes(nameChoice)) {
        return type.name;
      }
    })[0].name;
  }

  public getChoices(nameType: string): string[] {
    return this.structureTypes.filter((type) => {
      if (type.name == nameType) {
        return type.values;
      }
    })[0].values;
  }

  public pickType(type: string): void {
    this.pickedType = type;
  }

  public pickChoice(choice: string): void {
    this.pickedChoice = choice;
    this.selectedType.emit(choice);
  }

  public getStructureTypeIcon(type: string): string {
    switch (type) {
      case structureTypes.public:
        return 'typeStructure_public';
      case structureTypes.private:
        return 'typeStructure_private';
      case structureTypes.privateLucratif:
        return 'typeStructure_privateLucratif';
      default:
        throw new Error('Structure type not handle');
    }
  }
}
