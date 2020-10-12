import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {
    this.modalOpened = null;
    this.btnServicesChecked = false;
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
}
