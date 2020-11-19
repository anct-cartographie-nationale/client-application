import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StyleUtils } from '@angular/flex-layout';
import { OpeningDay } from '../models/openingDay.model';
import { Structure } from '../models/structure.model';
import { Filter } from './models/filter.model';

import { StructureListComponent } from './structure-list.component';

describe('StructureListComponent', () => {
  let component: StructureListComponent;
  let fixture: ComponentFixture<StructureListComponent>;
  let structure: Structure;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureListComponent);
    component = fixture.debugElement.componentInstance;
    structure = new Structure({
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
    });
    const structureList = new Array<Structure>(structure);
    structureList.length = 4;
    component.structureList = structureList;
    fixture.detectChanges(); // calls NgOnit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filters', () => {
    const arr: Filter[] = [];
    spyOn(component.searchEvent, 'emit');
    component.fetchResults(arr);
    expect(component.searchEvent.emit).toHaveBeenCalled();
    expect(component.searchEvent.emit).toHaveBeenCalledWith(arr);
  });

  it('should emit id structure and update variables to open details', () => {
    spyOn(component.selectedMarkerId, 'emit');
    component.showDetails(structure);
    expect(component.selectedMarkerId.emit).toHaveBeenCalled();
    expect(component.selectedMarkerId.emit).toHaveBeenCalledWith(structure.id);
    expect(component.showStructureDetails).toBe(true);
    expect(component.structure).toBe(structure);
  });

  it('should emit id structure and update variables to close details', () => {
    spyOn(component.selectedMarkerId, 'emit');
    component.closeDetails();
    expect(component.selectedMarkerId.emit).toHaveBeenCalled();
    expect(component.selectedMarkerId.emit).toHaveBeenCalledWith();
    expect(component.showStructureDetails).toBe(false);
  });

  it('should emit id structure to display map marker', () => {
    spyOn(component.displayMapMarkerId, 'emit');
    component.handleCardHover(structure);
    expect(component.displayMapMarkerId.emit).toHaveBeenCalled();
    expect(component.displayMapMarkerId.emit).toHaveBeenCalledWith([structure.id]);
  });

  it('should emit undefined id structure to remove map marker', () => {
    spyOn(component.displayMapMarkerId, 'emit');
    component.mouseOut();
    expect(component.displayMapMarkerId.emit).toHaveBeenCalled();
    expect(component.displayMapMarkerId.emit).toHaveBeenCalledWith([undefined]);
  });
});
