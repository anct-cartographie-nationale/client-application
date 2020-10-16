import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  @Output() searchEvent = new EventEmitter();
  searchTerm: string = '';
  // button variable
  modalType: string[] = ['services', 'modalite', 'plusFiltres'];

  // Modal variable
  categories: Category[];
  modalTypeOpened: string;

  // Checkbox variable
  checkedModules: string[];
  checkedModulesFilter: string[];

  ngOnInit(): void {
    // Store the different categories
    this.categories = [];

    // Manage checkbox
    this.checkedModules = new Array();
    this.checkedModulesFilter = new Array();
  }

  // Open the modal and display the list according to the right filter button
  private openModal(option: string): void {
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
  private applyFilter(): void {
    this.checkedModulesFilter = this.checkedModules.slice();
    this.openModal(this.modalTypeOpened);

    // Simulation send filter
    console.log(this.checkedModulesFilter);
  }

  // Management of the checkbox event (Check / Uncheck)
  private onCheckboxChange(event): void {
    if (event.target.checked) {
      this.checkedModules.push(event.target.value);
    } else {
      // Check if the unchecked module is present in the list and remove it
      if (this.checkedModules.indexOf(event.target.value) > -1) {
        this.checkedModules.splice(this.checkedModules.indexOf(event.target.value), 1);
      }
    }
  }

  // Clear only filters in the current modal
  private clearFilters(): void {
    this.categories.forEach((categ) => {
      categ.modules.forEach((module) => {
        if (this.checkedModules.indexOf(module) > -1)
          this.checkedModules.splice(this.checkedModules.indexOf(module), 1);
      });
    });
  }

  private submitSearch(searchTerm: string): void {
    this.searchEvent.emit(searchTerm);
  }

  /**
   * En attendant l'api
   */
  private mockService(module: Category[], titre: string, categ: string, nbCateg: number): void {
    var m = new Category();
    m.title = titre;
    m.modules = [];
    for (var i = 0; i < nbCateg; i++) {
      m.modules.push(categ + i);
    }
    module.push(m);
  }
  private fakeData(option: string): void {
    if (option === this.modalType[0]) {
      this.mockService(this.categories, 'Accompagnement aux démarches en ligne', 'CAF', 7);
      this.mockService(this.categories, 'Insertion sociale et professionnelle', ' Diffuser son CV en ligne', 5);
      this.mockService(
        this.categories,
        'Accès aux droits',
        'Déclarer ses revenus en ligne et découvertes des services proposés',
        8
      );
      this.mockService(this.categories, 'Aide à la parentalité/éducation', 'Découvrir l’univers des jeux vidéos', 4);
      this.mockService(this.categories, 'Compétences de base', 'Faire un diagnostic des compétences', 8);
      this.mockService(this.categories, 'Culture et sécurité numérique', 'Traitement de texte : découverte', 4);
    } else if (option === this.modalType[1]) {
      this.mockService(this.categories, "Modalité d'accueil", 'Matériel mis à dispostion', 6);
    } else if (option === this.modalType[2]) {
      this.mockService(this.categories, 'Équipements', 'Accès à des revues ou livres infoirmatiques numériques', 8);
      this.mockService(this.categories, "Type d'acteurs", 'Lieux de médiation (Pimms, assos...)', 5);
      this.mockService(this.categories, 'Publics', 'Langues étrangères autres qu’anglais', 12);
      this.mockService(this.categories, 'Labelisation', 'Prescripteur du Pass Numérique', 6);
      this.mockService(this.categories, 'Type de structure', 'Espace de co-working', 6);
    }
  }
}
