import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Structure } from '../../../../models/structure.model';
import { ProfileService } from '../../../../profile/services/profile.service';
import { StructureService } from '../../../../services/structure.service';
import { ButtonType } from '../../../../shared/components/button/buttonType.enum';
import { Filter } from '../../../../structure-list/models/filter.model';

@Component({
  selector: 'app-profile-structure-choice',
  templateUrl: './profile-structure-choice.component.html',
  styleUrls: ['./profile-structure-choice.component.scss'],
})
export class ProfileStructureChoiceComponent implements OnInit {
  @Input() structureForm: FormGroup;
  @Output() validateForm = new EventEmitter<Structure>();
  @Output() selectedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();
  @Output() createStructure = new EventEmitter<any>();
  public searchString: string = '';
  public structures: Structure[];
  public selectedStructureItem: Structure;
  public isAlreadySearching = false;
  public buttonTypeEnum = ButtonType;
  public profileStructuresLink: string[] = [];

  constructor(private structureService: StructureService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.isAlreadySearching = true;
    this.profileService.getProfile().then((profile) => {
      this.isAlreadySearching = false;
      this.profileStructuresLink = profile.structuresLink;
      this.getStructures(null);
    });
  }

  public onSearchChange(searchString: string) {
    if (searchString.length < 3 && this.searchString == '') return;
    this.searchString = searchString;
    const filters: Filter[] = [];
    if (searchString.length > 0) {
      filters.push(new Filter('query', searchString));
    }
    this.getStructures(filters);
  }

  public selectedResult(structure: Structure): void {
    if (structure['alreadySelected']) return;
    if (this.selectedStructureItem) this.selectedStructureItem['selected'] = false;
    this.selectedStructureItem = structure;
    this.structureForm.patchValue({ _id: structure._id, structureName: structure.structureName });
    this.validateForm.emit();
  }

  public isSelectedStructure(structure: Structure): boolean {
    if (this.selectedStructureItem && this.selectedStructureItem._id === structure._id) return true;
    return false;
  }

  private getStructures(filters: Filter[]) {
    if (!this.isAlreadySearching) {
      this.isAlreadySearching = true;
      this.structureService.getStructuresByName(filters).subscribe((structures) => {
        structures.forEach((structure) => {
          if (this.profileStructuresLink.includes(structure._id)) {
            structure['alreadySelected'] = true;
          }
        });
        if (this.searchString == '') {
          structures.sort((a, b) => a.structureName.localeCompare(b.structureName));
        }
        this.structures = structures;
        this.isAlreadySearching = false;
      });
    }
  }

  public addStructure(): void {
    this.createStructure.emit();
  }
}
