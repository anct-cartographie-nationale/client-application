import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/recherche.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
    });
  }
  form: FormGroup;
  modalOpened: string;
  modalType: string[] = ['services', 'accueil', 'plusFiltres'];
  btnServicesChecked: boolean;
  btnHomeChecked: boolean;
  btnMoreFilterchecked: boolean;
  test = '50%';
  services: Service[];

  ngOnInit(): void {
    this.modalOpened = null;
    this.btnServicesChecked = false;
    this.services = [];
    //Block en attendant
    this.mockService('Accompagnement aux démarches en ligne', 'CAF', 7);
    this.mockService('Insertion sociale et professionnelle', ' Diffuser son CV en ligne', 5);
    this.mockService('Accès aux droits', 'Déclarer ses revenus en ligne et découvertes des services proposés', 8);
    this.mockService('Aide à la parentalité/éducation', 'Découvrir l’univers des jeux vidéos', 4);
    this.mockService('Compétences de base', 'Faire un diagnostic des compétences', 8);
    this.mockService('Culture et sécurité numérique', 'Traitement de texte : découverte', 4);
    //Fin block en attendant
  }
  //Fonction en attendant
  mockService(titre: string, categ: string, nbCateg: number) {
    var service1 = new Service();
    service1.titre = titre;
    service1.categories = [];
    for (var i = 0; i < nbCateg; i++) {
      service1.categories.push(categ + '_' + i);
    }
    this.services.push(service1);
  }
  //Fin fonction en attendant
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
    console.log(this.form.value);
  }

  onCheckboxChange(e, reset: boolean) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (reset) {
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    } else {
      checkArray.clear();
    }
  }
  isChecked(module: string) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    var bool: boolean = false;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == module) {
        bool = true;
      }
    });
    return bool;
  }
}
