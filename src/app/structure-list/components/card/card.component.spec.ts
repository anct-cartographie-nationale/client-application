import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientModule } from '@angular/common/http';
import { Structure } from '../../../models/structure.model';
import { OpeningDay } from '../../../models/openingDay.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let structure: Structure;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
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
      nbComputers: '',
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
        openedOn: new OpeningDay('monday', null),
      },
      openedOn: new OpeningDay('monday', null),
    });
    component.structure = structure;
    fixture.detectChanges(); // calls NgOnit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transform a distance into km', () => {
    component.structure.distance = 4320;
    const distance = component.formatDistance();
    expect(distance).toEqual('4.3 km');
  });
  it('should transform a distance into m', () => {
    component.structure.distance = 400;
    const distance = component.formatDistance();
    expect(distance).toEqual('400 m');
  });

  it('should emit structure to show details', () => {
    spyOn(component.showDetails, 'emit');
    component.cardClicked();
    expect(component.showDetails.emit).toHaveBeenCalled();
    expect(component.showDetails.emit).toHaveBeenCalledWith(structure);
  });
  it('should emit structure on cardHover', () => {
    spyOn(component.hover, 'emit');
    component.cardHover();
    expect(component.hover.emit).toHaveBeenCalled();
    expect(component.hover.emit).toHaveBeenCalledWith(structure);
  });
});
