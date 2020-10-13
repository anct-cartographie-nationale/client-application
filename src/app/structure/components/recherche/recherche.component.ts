import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/recherche.model';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  constructor() {}
  modalOpened: string;
  modalType: string[] = ['services', 'accueil', 'plusFiltres'];
  btnServicesChecked: boolean;
  btnHomeChecked: boolean;
  btnMoreFilterchecked: boolean;
  test = '50%';
  services: Service[];

  ngOnInit(): void {
    this.modalOpened = 'services';
    this.btnServicesChecked = false;
    this.services = [];
    this.mockService('Accompagnement aux démarches en ligne', 'CAF', 7);
    this.mockService('Insertion sociale et professionnelle', 'Diffuser son CV en ligne', 5);
    this.mockService('Accès aux droits', 'Déclarer ses revenus en ligne et découvertes des services proposés', 8);
    this.mockService('Aide à la parentalité/éducation', 'Découvrir l’univers des jeux vidéos', 4);
    this.mockService('Compétences de base', 'Faire un diagnostic des compétences', 8);
    this.mockService('Culture et sécurité numérique', 'Traitement de texte : découverte', 4);
    console.log(this.services);
    this.calcSizeCol(this.services);
  }

  mockService(titre: string, categ: string, nbCateg: number) {
    var service1 = new Service();
    service1.titre = titre;
    service1.categories = [];
    for (var i = 0; i < nbCateg; i++) {
      service1.categories.push(categ + '_' + i);
    }
    this.services.push(service1);
  }
  openModal(option: string) {
    this.modalOpened = null;
    switch (option) {
      case this.modalType[0]:
        this.btnServicesChecked = !this.btnServicesChecked;
        this.btnHomeChecked = false;
        this.btnMoreFilterchecked = false;
        if (this.btnServicesChecked) this.modalOpened = this.modalType[0];
        break;
      case this.modalType[1]:
        this.btnHomeChecked = !this.btnHomeChecked;
        this.btnMoreFilterchecked = false;
        this.btnServicesChecked = false;
        if (this.btnHomeChecked) this.modalOpened = this.modalType[1];
        break;
      case this.modalType[2]:
        this.btnMoreFilterchecked = !this.btnMoreFilterchecked;
        this.btnServicesChecked = false;
        this.btnHomeChecked = false;
        if (this.btnMoreFilterchecked) this.modalOpened = this.modalType[2];
        break;
    }
  }
  applyFilter() {
    this.openModal(this.modalOpened);
  }

  calcSizeCol(services: Service[]) {
    for (var i = 0; i < services.length; i++) {
      if (services[i + 1]) {
        var nb1, nb2: number;
        nb1 = services[i].categories.length;
        nb2 = services[i + 1].categories.length;
        if (nb1 + nb2 <= 13) {
          services[i].size = parseFloat((nb1 / 13).toPrecision(2)) * 100;
          services[i + 1].size = parseFloat((1 - services[i].size / 100).toPrecision(2)) * 100;
          i++;
        } else {
          services[i].size = 100;
        }
      }
    }
  }
}
