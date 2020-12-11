import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GeoJson } from '../../../map/models/geojson.model';
import { GeojsonService } from '../../../services/geojson.service';
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
  constructor(public searchService: SearchService, private fb: FormBuilder, private geoJsonService: GeojsonService) {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });
  }

  @Output() searchEvent = new EventEmitter();

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

  // Modal confirmation variable
  public isConfirmationModalOpen = false;
  public confirmationModalContent =
    'Afin d’ajouter votre structure,vous allez être redirigé vers le formulaire Grand Lyon à remplir.';

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
      filters.push(new Filter('query', term));
    }
    // Add checked box filter
    this.checkedModulesFilter.forEach((cm) => {
      filters.push(new Filter(this.fromStringToId(cm.text), this.mockApiNumber(cm.id)));
    });
    // Send filters
    this.searchEvent.emit(filters);
  }

  // Delete when getting back-end
  private mockApiNumber(nb: string): string {
    return nb.length < 3 ? ('00' + nb).slice(-3) : nb;
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
      this.fakeData(modalType);
    }
  }

  public closeModal(): void {
    this.modalTypeOpened = undefined;
  }

  private fromStringToId(categ: string): string {
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
  // Get adress and put it in input
  public locateMe(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.geoJsonService.getAddressByCoord(longitude, latitude).subscribe((geoPosition: GeoJson) => {
        const adress = geoPosition.properties.name;
        this.searchForm.setValue({ searchTerm: adress });
        this.applyFilter(adress);
      });
    });
  }
  // Management of the checkbox event (Check / Uncheck)
  public numericPassCheck(event, categ): void {
    const checkValue: string = event.target.value;
    const inputTerm = this.searchForm.get('searchTerm').value;
    if (event.target.checked) {
      this.checkedModulesFilter.push(new Module(checkValue, categ));
      this.numberMoreFiltersChecked++;
    } else {
      // Check if the unchecked module is present in the list and remove it
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
  private fakeData(option: TypeModal): void {
    if (option === TypeModal.accompaniment) {
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
    } else if (option === TypeModal.training) {
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
    } else if (option === TypeModal.moreFilters) {
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
  public openConfirmationModal(): void {
    this.isConfirmationModalOpen = true;
  }
  public closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
  }
}
