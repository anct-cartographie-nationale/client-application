import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleUtils } from '@angular/flex-layout';
import { OpeningDay } from '../models/openingDay.model';
import { Structure } from '../models/structure.model';

import { StructureListComponent } from './structure-list.component';

describe('StructureListComponent', () => {
  let component: StructureListComponent;
  let fixture: ComponentFixture<StructureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureListComponent);
    component = fixture.debugElement.componentInstance;
    const structureList = new Array<Structure>(
      new Structure({
        id: 1,
        numero: '26-63',
        dateDeCreation: '2020-10-08T15:17:00.000Z',
        derniereModification: '2020-10-08T15:17:00.000Z',
        nomDeLusager: 'Erwan Le luron',
        votreStructureEstElle: 'Un établissement principal (siège social)',
        nomDeVotreStructure: 'Régie de Quartier Armstrong',
        typeDeStructure: 'Tiers-lieu & coworking, FabLab',
        description: "Association loi 1901 dont l'objet est l'insertion par l'économie social et solidaire",
        n: 2,
        voie: 21356,
        telephone: '04 72 21 03 07',
        courriel: 'sguillet@rqa.fr',
        siteWeb: '',
        facebook: '',
        twitter: '@rqainfo69',
        instagram: '',
        civilite: 'Madame',
        nom: 'GUILLET',
        prenom: 'Séverine',
        fonction: 'Autres',
        accessibilitePersonnesAMobiliteReduitePmr: '',
        choixMultiples: 'Tout public',
        fermeturesExceptionnelles: '',
        jaccompagneLesUsagersDansLeursDemarchesEnLigne: 'True',
        accompagnementDesDemarches: 'Accompagnant CAF',
        autresAccompagnements: '',
        lesCompetencesDeBase: 260,
        accesAuxDroits: 176,
        insertionSocialeEtProfessionnelle: 254,
        aideALaParentalite: '',
        cultureEtSecuriteNumerique: 264,
        wifiEnAccesLibre: 'True',
        ordinateurs: '',
        nombre: '',
        tablettes: '',
        bornesNumeriques: '',
        imprimantes: '',
        autresEspacesProposesParLaStructure: 'Espace libre service',
        statutJuridique: '',
        appartenezVousAUnReseauDeMediation: '',
        precisezLequel: '',
        idDeLitemStructureDansDirectus: 123,
        statutDeLitemStructureDansDirectus: '',
        idDeLitemOffreDansDirectus: '',
        statut: 'Erreur lors du versement des données offre',
        hours: {
          monday: {
            open: true,
            time: [
              {
                openning: 1330,
                closing: 1630,
              },
              {
                openning: null,
                closing: null,
              },
            ],
          },
          tuesday: {
            open: true,
            time: [
              {
                openning: 830,
                closing: 1130,
              },
              {
                openning: 1330,
                closing: 1630,
              },
            ],
          },
          wednesday: {
            open: true,
            time: [
              {
                openning: 1330,
                closing: 1630,
              },
              {
                openning: null,
                closing: null,
              },
            ],
          },
          thursday: {
            open: true,
            time: [
              {
                openning: 830,
                closing: 1130,
              },
              {
                openning: 1330,
                closing: 1630,
              },
            ],
          },
          friday: {
            open: true,
            time: [
              {
                openning: 830,
                closing: 1130,
              },
              {
                openning: 1330,
                closing: 1530,
              },
            ],
          },
          saturday: {
            open: false,
            time: [
              {
                openning: null,
                closing: null,
              },
              {
                openning: null,
                closing: null,
              },
            ],
          },
          sunday: {
            open: false,
            time: [
              {
                openning: null,
                closing: null,
              },
              {
                openning: null,
                closing: null,
              },
            ],
          },
        },
        openedOn: new OpeningDay('monday', null),
      })
    );
    structureList.length = 4;
    console.log(structureList.length);
    component.structureList = structureList;
    fixture.detectChanges(); // calls NgOnit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
