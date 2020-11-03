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
  public modalTypeOpened: string; // todo: utiliser enum
  public isOpenModal = false;
  // Checkbox variable
  public checkedModulesFilter: Module[];

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
  private mockApiNumber(nb: number): string {
    return ('00' + nb).slice(-3);
  }

  public fetchResults(checkedModules: Module[]): void {
    const inputTerm = this.searchForm.get('searchTerm').value;

    // Store checked modules
    this.checkedModulesFilter = checkedModules;

    // Close modal after receive filters from her.
    this.closeModal();
    inputTerm ? this.applyFilter(inputTerm) : this.applyFilter(null);
  }

  // Open the modal and display the list according to the right filter button
  public openModal(option: string): void {
    console.log(this.modalTypeOpened);
    console.log(option);
    console.log(this.isOpenModal);
    this.categories = [];
    if (this.modalTypeOpened !== option) {
      if (!this.isOpenModal) {
        this.modalTypeOpened = option;
        this.fakeData(option);
        this.isOpenModal = true;
      } else {
        this.isOpenModal = false;
      }
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

  // Fake service api
  private mockService(module: Category[], titre: string, categ: any, nbCateg: number): void {
    const category = new Category({ name: titre, modules: [] });
    for (let i = 0; i < nbCateg; i++) {
      category.modules.push(new Module(categ.id + i, categ.name + i));
    }
    module.push(category);
  }

  // Get the correct list of checkbox/modules depending on the type of modal.
  private fakeData(option: string): void {
    if (option === TypeModal[0]) {
      this.mockService(this.categories, 'Accompagnement des démarches', { name: 'CAF', id: 5 }, 7);
    } else if (option === TypeModal[1]) {
      forkJoin([this.searchService.getCategoriesFormations(), this.searchService.getFakeCounterModule()]).subscribe(
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
