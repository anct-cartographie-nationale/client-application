import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GeojsonService } from '../../../services/geojson.service';
import { TypeModal } from '../../enum/typeModal.enum';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { Module } from '../../models/module.model';
import { StructureCounter } from '../../models/structureCounter.model';
import { SearchService } from '../../services/search.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-structure-list-search',
  templateUrl: './structure-list-search.component.html',
  styleUrls: ['./structure-list-search.component.scss'],
})
export class StructureListSearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();

  // Show/hide form createStructure
  public addStructureFormModal = false;

  @Output() locatationReset: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() locatationTrigger: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() locate = false;
  // Form search input
  public searchForm: FormGroup;
  // Modal variable
  public categories: Category[];
  public modalTypeOpened: TypeModal;
  // Checkbox variable
  public checkedModulesFilter: Module[];

  public numberTrainingChecked = 0;
  public numberAccompanimentChecked = 0;
  public numberMoreFiltersChecked = 0;

  public queryString: string;
  // Modal confirmation variable
  public isConfirmationModalOpen = false;
  public confirmationModalContent =
    'Afin d’ajouter votre structure,vous allez être redirigé vers le formulaire Grand Lyon à remplir.';

  constructor(
    public searchService: SearchService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });
  }
  ngOnInit(): void {
    // Will store the different categories
    this.queryString = this.activatedRoute.snapshot.queryParamMap.get('search');
    this.categories = [];
    this.checkedModulesFilter = new Array();
    if (this.queryString) {
      const filters: Filter[] = [];
      filters.push(new Filter('query', this.queryString));
      this.searchEvent.emit(filters);
    }
  }

  // Accessor to template angular.
  public get TypeModal(): typeof TypeModal {
    return TypeModal;
  }

  // Clear input search
  public clearInput(): void {
    this.searchForm.reset();
    this.applyFilter(null);
    if (this.locate) {
      this.locatationReset.emit(true);
    }
  }

  // Sends an array containing all filters
  public applyFilter(term: string): void {
    // Add search input filter
    if (term) {
      this.router.navigate(['/acteurs'], {
        relativeTo: this.route,
        queryParams: {
          search: term,
        },
        queryParamsHandling: 'merge',
      });
    }
    const filters: Filter[] = [];
    if (term) {
      filters.push(new Filter('query', term));
    }
    // Add checked box filter
    this.checkedModulesFilter.forEach((cm) => {
      filters.push(new Filter(cm.text, cm.id));
    });
    // Send filters
    this.searchEvent.emit(filters);
  }

  public fetchResults(checkedModules: Module[]): void {
    const inputTerm = this.searchForm.get('searchTerm').value;
    // Check if some modules is checked in filters
    if (this.checkedModulesFilter !== checkedModules) {
      // First btn
      switch (this.modalTypeOpened) {
        case TypeModal.accompaniment:
          this.numberAccompanimentChecked = this.countCheckFiltersOnModules(
            checkedModules,
            this.numberTrainingChecked + this.numberMoreFiltersChecked
          );
          break;
        case TypeModal.training:
          this.numberTrainingChecked = this.countCheckFiltersOnModules(
            checkedModules,
            this.numberAccompanimentChecked + this.numberMoreFiltersChecked
          );
          break;
        case TypeModal.moreFilters:
          this.numberMoreFiltersChecked = this.countCheckFiltersOnModules(
            checkedModules,
            this.numberAccompanimentChecked + this.numberTrainingChecked
          );
          break;
        default:
          throw new Error('Modal type not handle');
      }
    }
    // Store checked modules
    this.checkedModulesFilter = checkedModules;

    // Close modal after receive filters from her.
    this.closeModal();
    this.applyFilter(inputTerm);
  }

  // Check if some modules is checked on filter and store number of modules checked
  public countCheckFiltersOnModules(checkedModules: Module[], value: number): number {
    if (checkedModules.length && value !== checkedModules.length) {
      return checkedModules.length - value;
    } else {
      return 0;
    }
  }
  // Open the modal and display the list according to the right filter button
  public openModal(modalType: TypeModal): void {
    this.categories = [];
    // if modal already opened, reset type
    if (this.modalTypeOpened === modalType) {
      this.closeModal();
    } else if (this.modalTypeOpened !== modalType) {
      this.modalTypeOpened = modalType;
      this.getData(modalType);
    }
  }

  public closeModal(): void {
    this.modalTypeOpened = undefined;
  }

  // Management of the checkbox event (Check / Uncheck)
  public numericPassCheck(event, categ): void {
    const checkValue: string = event.target.value;
    const inputTerm = this.searchForm.get('searchTerm').value;
    if (event.target.checked) {
      this.checkedModulesFilter.push(new Module(checkValue, categ));
      this.numberMoreFiltersChecked++;
    } else {
      // Check if the module is present in the list and remove it
      const index = this.checkedModulesFilter.findIndex((m: Module) => m.id === checkValue && m.text === categ);
      if (index > -1) {
        this.checkedModulesFilter.splice(index, 1);
        this.numberMoreFiltersChecked = this.countCheckFiltersOnModules(
          this.checkedModulesFilter,
          this.numberAccompanimentChecked + this.numberTrainingChecked
        );
      }
    }
    this.applyFilter(inputTerm);
  }

  // Get the correct list of checkbox/modules depending on the type of modal.
  private getData(option: TypeModal): void {
    if (option === TypeModal.accompaniment) {
      forkJoin([
        this.searchService.getCategoriesAccompaniment(),
        this.searchService.getFakeCounterModule(this.checkedModulesFilter),
      ]).subscribe((res) => {
        const categories: Category[] = res[0];
        const structureCounter: StructureCounter[] = res[1];
        categories.forEach((category) => {
          category = this.searchService.setCountModules(category, structureCounter);
          this.categories.push(category);
        });
      });
    } else if (option === TypeModal.training) {
      forkJoin([
        this.searchService.getCategoriesTraining(),
        this.searchService.getFakeCounterModule(this.checkedModulesFilter),
      ]).subscribe((res) => {
        const categories: Category[] = res[0];
        const structureCounter: StructureCounter[] = res[1];
        categories.forEach((category) => {
          category = this.searchService.setCountModules(category, structureCounter);
          this.categories.push(category);
        });
      });
    } else if (option === TypeModal.moreFilters) {
      forkJoin([
        this.searchService.getCategoriesMoreFilters(),
        this.searchService.getFakeCounterModule(this.checkedModulesFilter),
      ]).subscribe((res) => {
        const categories: Category[] = res[0];
        const structureCounter: StructureCounter[] = res[1];
        categories.forEach((category) => {
          category = this.searchService.setCountModules(category, structureCounter);
          this.categories.push(category);
        });
      });
    }
  }
}
