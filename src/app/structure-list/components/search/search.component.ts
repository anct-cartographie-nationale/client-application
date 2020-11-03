import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { TypeModal } from '../../enum/typeModal.enum';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { Module } from '../../models/module.model';
import { StructureCounter } from '../../models/structureCounter.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-structure-list-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });
  }

  @Output() searchEvent = new EventEmitter();

  // Form search input
  public searchForm: FormGroup;
  // Modal variable
  public categories: Category[];
  public modalTypeOpened: string;
  // Checkbox variable
  public checkedModulesFilter: Module[];

  public numberTrainingChecked: number = 0;
  public numberAccompanimentChecked: number = 0;
  public numberMoreFiltersChecked: number = 0;

  ngOnInit(): void {
    // Will store the different categories
    this.categories = [];

    this.checkedModulesFilter = new Array();
  }

  // Accessor to template angular.
  public get TypeModal(): typeof TypeModal {
    return TypeModal;
  }

  // Clear input search
  public clearInput(): void {
    this.searchForm.reset();
    this.applyFilter(null);
  }

  // Sends an array containing all filters
  public applyFilter(term: string): void {
    // Add search input filter
    const filters: Filter[] = [];
    if (term) {
      filters.push(new Filter('nomDeVotreStructure', term, false));
    }
    // Add checked box filter
    this.checkedModulesFilter.forEach((cm) => {
      filters.push(new Filter(this.fromStringToIdExcel(cm.text), this.mockApiNumber(cm.id), false));
    });
    // Send filters
    this.searchEvent.emit(filters);
  }

  // Delete when getting back-end
  private mockApiNumber(nb: string): string {
    return ('00' + nb).slice(-3);
  }

  public fetchResults(checkedModules: Module[]): void {
    const inputTerm = this.searchForm.get('searchTerm').value;

    // Check if some modules is checked in filters
    if (this.checkedModulesFilter !== checkedModules) {
      // First btn filter
      if (this.modalTypeOpened === TypeModal[0]) {
        // Check if some modules is checked on first filter and store number of modules checked
        checkedModules.length && this.numberTrainingChecked + this.numberMoreFiltersChecked != checkedModules.length
          ? (this.numberAccompanimentChecked =
              checkedModules.length - (this.numberTrainingChecked + this.numberMoreFiltersChecked))
          : (this.numberAccompanimentChecked = 0);
      } // Second btn filter
      else if (this.modalTypeOpened === TypeModal[1]) {
        // Check if some modules is checked on first filter and store number of modules checked
        checkedModules.length &&
        this.numberAccompanimentChecked + this.numberMoreFiltersChecked != checkedModules.length
          ? (this.numberTrainingChecked =
              checkedModules.length - (this.numberAccompanimentChecked + this.numberMoreFiltersChecked))
          : (this.numberTrainingChecked = 0);
      } // Third btn filter
      else if (this.modalTypeOpened === TypeModal[2]) {
        // Check if some modules is checked on first filter and store number of modules checked
        checkedModules.length && this.numberAccompanimentChecked + this.numberTrainingChecked != checkedModules.length
          ? (this.numberMoreFiltersChecked =
              checkedModules.length - (this.numberAccompanimentChecked + this.numberTrainingChecked))
          : (this.numberMoreFiltersChecked = 0);
      }
    }
    // Store checked modules
    this.checkedModulesFilter = checkedModules;

    // Close modal after receive filters from her.
    this.closeModal();
    inputTerm ? this.applyFilter(inputTerm) : this.applyFilter(null);
  }

  // Open the modal and display the list according to the right filter button
  public openModal(option: string): void {
    this.categories = [];
    if (this.modalTypeOpened !== option) {
      this.modalTypeOpened = option;
      this.fakeData(option);
    } else {
      this.modalTypeOpened = null;
    }
  }
  public closeModal(): void {
    this.modalTypeOpened = null;
  }

  private fromStringToIdExcel(categ: string): string {
    const splitStr = categ.toLowerCase().split(' ');
    for (let i = 1; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr
      .join('')
      .normalize('NFD')
      .replace(/[\u0300-\u036f'’°()]/g, '')
      .replace(/[\s-]/g, ' ')
      .replace('?', '');
  }

  // Get the correct list of checkbox/modules depending on the type of modal.
  private fakeData(option: string): void {
    if (option === TypeModal[0]) {
      forkJoin([this.searchService.getCategoriesAccompaniment(), this.searchService.getFakeCounterModule()]).subscribe(
        (res) => {
          const categories: Category[] = res[0];
          const structureCounter: StructureCounter[] = res[1];
          categories.forEach((category) => {
            category = this.searchService.setCountModules(category, structureCounter);
            this.categories.push(category);
          });
        }
      );
    } else if (option === TypeModal[1]) {
      forkJoin([this.searchService.getCategoriesTraining(), this.searchService.getFakeCounterModule()]).subscribe(
        (res) => {
          const categories: Category[] = res[0];
          const structureCounter: StructureCounter[] = res[1];
          categories.forEach((category) => {
            category = this.searchService.setCountModules(category, structureCounter);
            this.categories.push(category);
          });
        }
      );
    } else if (option === TypeModal[2]) {
      forkJoin([this.searchService.getCategoriesMoreFilters(), this.searchService.getFakeCounterModule()]).subscribe(
        (res) => {
          const categories: Category[] = res[0];
          const structureCounter: StructureCounter[] = res[1];
          categories.forEach((category) => {
            category = this.searchService.setCountModules(category, structureCounter);
            this.categories.push(category);
          });
        }
      );
    }
  }
}
