import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { Module } from '../../models/module.model';
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
  searchForm: FormGroup;

  // Button variable
  modalType: string[] = ['accompagnement', 'formations', 'plusFiltres'];

  // Modal variable
  categories: Category[];
  modalTypeOpened: string;

  // Checkbox variable
  checkedModules: Module[];
  checkedModulesFilter: Module[];

  ngOnInit(): void {
    // Will store the different categories
    this.categories = [];

    // Manage checkbox
    this.checkedModules = new Array();
    this.checkedModulesFilter = new Array();
  }

  // Delete when getting back-end
  private mockApiNumber(nb: number): string {
    return ('00' + nb).slice(-3);
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

    // Init checked list modules
    this.checkedModules = this.checkedModulesFilter.slice();
  }

  // Sends an array containing all filters
  public applyFilter(term: string): void {
    this.checkedModulesFilter = this.checkedModules.slice();
    this.openModal(this.modalTypeOpened);
    // Send search input filter
    let filters: Filter[] = [];
    if (term) {
      filters.push(new Filter('nom', term, false));
    }

    // Send checked box filter
    this.checkedModulesFilter.forEach((cm) => {
      filters.push(new Filter(this.fromStringToIdExcel(cm.text), this.mockApiNumber(cm.id), false));
    });
    this.searchEvent.emit(filters);
  }

  // Management of the checkbox event (Check / Uncheck)
  public onCheckboxChange(event, categ: string): void {
    const checkValue: number = parseInt(event.target.value);
    if (event.target.checked) {
      this.checkedModules.push(new Module(checkValue, categ));
    } else {
      // Check if the unchecked module is present in the list and remove it
      if (this.getIndex(checkValue, categ) > -1) {
        this.checkedModules.splice(this.getIndex(checkValue, categ), 1);
      }
    }
  }

  // Return index of a specific module in array modules
  public getIndex(id: number, categ: string): number {
    return this.checkedModules.findIndex((m: Module) => m.id === id && m.text === categ);
  }

  // Clear only filters in the current modal
  public clearFilters(): void {
    this.categories.forEach((categ: Category) => {
      categ.modules.forEach((module: Module) => {
        if (this.getIndex(module.id, categ.name) > -1)
          this.checkedModules.splice(this.getIndex(module.id, categ.name), 1);
      });
    });
  }

  // Format title of category to id of excel category
  private fromStringToIdExcel(categ: string): string {
    let splitStr = categ.toLowerCase().split(' ');
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

  // Fake service api
  private mockService(module: Category[], titre: string, categ: any, nbCateg: number): void {
    let m = new Category();
    m.name = titre;
    m.modules = [];
    for (let i = 0; i < nbCateg; i++) {
      m.modules.push(new Module(categ.id + i, categ.name + i));
    }
    module.push(m);
  }

  // Fake data
  private fakeData(option: string): void {
    if (option === this.modalType[0]) {
      this.mockService(this.categories, 'Accompagnement des démarches', { name: 'CAF', id: 5 }, 7);
    } else if (option === this.modalType[1]) {
      this.searchService.getCategories().subscribe((categories: Category[]) => {
        this.searchService
          .getFakeCounterModule()
          .subscribe((res: { structureCountTab: { id: number; count: number }[] }) => {
            categories.forEach((category) => {
              category = this.searchService.setCountModules(category, res.structureCountTab);
              this.categories.push(category);
            });
          });
      });
    } else if (option === this.modalType[2]) {
      this.mockService(
        this.categories,
        'Équipements',
        { name: 'Accès à des revues ou livres infoirmatiques numériques', id: 1 },
        8
      );
      this.mockService(this.categories, "Modalité d'accueil", { name: 'Matériel mis à dispostion', id: 2 }, 6);

      this.mockService(this.categories, "Type d'acteurs", { name: 'Lieux de médiation (Pimms, assos...)', id: 3 }, 5);
      this.mockService(this.categories, 'Publics', { name: 'Langues étrangères autres qu’anglais', id: 4 }, 12);
      this.mockService(this.categories, 'Labelisation', { name: 'Prescripteur du Pass Numérique', id: 5 }, 6);
      this.mockService(this.categories, 'Type de structure', { name: 'Espace de co-working', id: 6 }, 6);
    }
  }
}
