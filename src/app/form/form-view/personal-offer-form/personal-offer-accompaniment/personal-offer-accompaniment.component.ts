import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Structure } from '../../../../models/structure.model';
import { ButtonType } from '../../../../shared/components/button/buttonType.enum';
import { Category } from '../../../../structure-list/models/category.model';
import { Module } from '../../../../structure-list/models/module.model';
import { SearchService } from '../../../../structure-list/services/search.service';

@Component({
  selector: 'app-personal-offer-accompaniment',
  templateUrl: './personal-offer-accompaniment.component.html',
  styleUrls: ['./personal-offer-accompaniment.component.scss'],
})
export class PersonalOfferAccompanimentComponent implements OnInit {
  @Input() structureName: string;
  @Input() personalOfferForm: FormGroup;
  @Output() validateForm = new EventEmitter<any>();

  public buttonTypeEnum = ButtonType;
  public proceduresAccompaniment: Category;
  public selectedModules: Module[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.validateForm.emit();
    this.searchService.getCategoriesAccompaniment().subscribe((categories: Category[]) => {
      this.proceduresAccompaniment = categories[0];
      const proceduresAccompaniment = this.personalOfferForm.get('proceduresAccompaniment').value;
      this.selectedModules = proceduresAccompaniment.map((procedure) =>
        this.proceduresAccompaniment.modules.find((module) => module.id === procedure)
      );
    });
  }

  public toogleResult(module: Module): void {
    if (this.isSelectedModule(module)) {
      const index = this.selectedModules.findIndex((_module) => _module.id === module.id);
      this.selectedModules.splice(index, 1);
    } else {
      this.selectedModules.push(module);
    }
    this.personalOfferForm.get('proceduresAccompaniment').patchValue(this.selectedModules.map((_module) => _module.id));
  }

  public isSelectedModule(module: Module): boolean {
    if (this.selectedModules && this.selectedModules.includes(module)) return true;
    return false;
  }
}
