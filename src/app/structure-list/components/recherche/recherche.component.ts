import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  constructor() {}
  //Variables btn filtres
  modalType: string[] = ['services', 'accueil', 'plusFiltres'];

  //Variable gestion liste modal
  servicesCategories: Category[];
  modaliteCategories: Category[];
  categories: Category[];
  filtresCategories: Category[];
  modalOpened: string;

  //Variable gestion Checkbox
  checkedTab: string[];
  filterCheck: string[];

  ngOnInit(): void {
    //Sert à afficher la modal et indiquer le type de filtre choisit
    this.modalOpened = null;

    //Sert à stocker les différentes catégories
    this.servicesCategories = [];
    this.modaliteCategories = [];
    this.categories = [];
    this.filtresCategories = [];

    //Sert à gérer la checkbox multiple
    this.checkedTab = new Array();
    this.filterCheck = new Array();
  }

  //Ouvrir la modal et afficher la liste en fonction du btn de filtre appuyé
  openModal(option: string) {
    this.categories = [];
    switch (option) {
      case this.modalType[0]:
        //Vérifie si le btn n'est pas actif
        if (this.modalOpened != this.modalType[0]) {
          this.modalOpened = this.modalType[0];
          this.fakeDataServices();
        } else {
          this.modalOpened = null;
        }
        break;
      case this.modalType[1]:
        //Vérifie si le btn n'est pas actif
        if (this.modalOpened != this.modalType[1]) {
          this.modalOpened = this.modalType[1];
          this.fakeDataModalite();
        } else {
          this.modalOpened = null;
        }
        break;
      case this.modalType[2]:
        //Vérifie si le btn n'est pas actif
        if (this.modalOpened != this.modalType[2]) {
          this.modalOpened = this.modalType[2];
          this.fakeDataFiltres();
        } else {
          this.modalOpened = null;
        }
        break;
    }
    //Initialisation de la liste temporaire
    this.checkedTab = this.filterCheck.slice();
  }

  //Envoie d'un tableau contenant tous les filtres
  applyFilter() {
    this.filterCheck = this.checkedTab.slice();
    this.openModal(this.modalOpened);
    console.log(this.filterCheck);
  }

  //Gestion de l'evenement checkbox(Cocher/Décocher)
  onCheckboxChange(e, reset: boolean) {
    //Condition btn effacer filtre d'une liste
    if (!reset) {
      if (e.target.checked) {
        this.checkedTab.push(e.target.value);
      } else {
        //Vérifie si la case décochée est présente dans la liste temporaire et la supprime
        if (this.checkedTab.indexOf(e.target.value) > -1) {
          this.checkedTab.splice(this.checkedTab.indexOf(e.target.value), 1);
        }
      }
    } else {
      //Efface uniquement les éléments de la liste en cours
      this.categories.forEach((m) => {
        m.modules.forEach((categ) => {
          if (this.checkedTab.indexOf(categ) > -1) this.checkedTab.splice(this.checkedTab.indexOf(categ), 1);
        });
      });
    }
  }

  /**
   * En attendant les apis
   */
  mockService(module: Category[], titre: string, categ: string, nbCateg: number) {
    var m = new Category();
    m.titre = titre;
    m.modules = [];
    for (var i = 0; i < nbCateg; i++) {
      m.modules.push(categ + i);
    }
    module.push(m);
  }
  fakeDataServices() {
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
  }
  fakeDataModalite() {
    this.mockService(this.categories, "Modalité d'accueil", 'Matériel mis à dispostion', 6);
  }
  fakeDataFiltres() {
    this.mockService(this.categories, 'Équipements', 'Accès à des revues ou livres infoirmatiques numériques', 8);
    this.mockService(this.categories, "Type d'acteurs", 'Lieux de médiation (Pimms, assos...)', 5);
    this.mockService(this.categories, 'Publics', 'Langues étrangères autres qu’anglais', 12);
    this.mockService(this.categories, 'Labelisation', 'Prescripteur du Pass Numérique', 6);
    this.mockService(this.categories, 'Type de structure', 'Espace de co-working', 6);
  }
}
