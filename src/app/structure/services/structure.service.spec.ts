import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { horaireStructure, Jour, Structure } from '../models/structure.model';
import { StructureService } from './structure.service';
const { DateTime } = require('luxon');

describe('StructureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
  });
  let _structureService: StructureService;
  beforeEach(inject([StructureService], (_s: StructureService) => {
    _structureService = _s;
  }));
  it('should return an hour string', () => {
    const result = _structureService.numberToHour(928);
    expect(result).toBe('9h28');
  });

  it('should return a day string', () => {
    const result = _structureService.numberToDay(1);
    expect(result).toBe('lundi');
  });
  it('should return null', () => {
    const result = _structureService.numberToDay(8);
    expect(result).toBeNull();
  });

  it('Comparer Horaire : should return true', () => {
    const result = _structureService.comparerHoraire(830, 1200, 900);
    expect(result).toBeTrue();
  });

  it('Comparer Horaire : should return false', () => {
    const result = _structureService.comparerHoraire(830, 1200, 800);
    expect(result).toBeFalse();
  });

  it('Recuperer Horaire : should return an object (Jour)', () => {
    const s: Structure = new Structure();
    var horaire = [
      { openning: 800, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    s.horaires = new horaireStructure();
    s.horaires.mardi = new Jour();
    s.horaires.mardi.open = true;
    s.horaires.mardi.time = horaire;
    const jour: Jour = new Jour();
    jour.open = true;
    jour.time = horaire;
    const result = _structureService.recupererHoraire(s, 2);
    expect(result).toEqual(jour);
  });

  it('Recuperer Horaire : should return undefined', () => {
    const s: Structure = new Structure();
    var horaire = [
      { openning: 800, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.lundi.open = true;
    s.horaires.lundi.time = horaire;
    const jour: Jour = new Jour();
    jour.open = true;
    jour.time = horaire;
    const result = _structureService.recupererHoraire(s, 2);
    expect(result).toBeUndefined();
  });

  it('Recuperer Horaire : should return null', () => {
    const s: Structure = new Structure();
    var horaire = [
      { openning: 800, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    s.horaires = new horaireStructure();
    s.horaires.mardi = new Jour();
    s.horaires.mardi.open = true;
    s.horaires.mardi.time = horaire;
    const result = _structureService.recupererHoraire(s, 8);
    expect(result).toBeNull();
  });

  it('Recuperer Prochaine Ouverture : should return an object ({Jour/Horaire})', () => {
    //Init structure
    const s: Structure = new Structure();
    var horaire = [
      { openning: 805, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.mardi = new Jour();
    s.horaires.mercredi = new Jour();
    s.horaires.jeudi = new Jour();
    s.horaires.vendredi = new Jour();
    s.horaires.samedi = new Jour();
    s.horaires.dimanche = new Jour();
    s.horaires.mardi.open = true;
    s.horaires.mardi.time = horaire;

    //Init sur vendredi à 14h00
    const result = _structureService.recupererProchaineOuverture(s, 5, 5, 1400);
    expect(result).toEqual({ jour: 'mardi', horaire: '8h05' });
  });

  it('Recuperer Prochaine Ouverture dans la journée : should return an object ({Jour/Horaire})', () => {
    //Init structure
    const s: Structure = new Structure();
    var horaire = [
      { openning: 805, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.mardi = new Jour();
    s.horaires.mercredi = new Jour();
    s.horaires.jeudi = new Jour();
    s.horaires.vendredi = new Jour();
    s.horaires.samedi = new Jour();
    s.horaires.dimanche = new Jour();
    s.horaires.mardi.open = true;
    s.horaires.mardi.time = horaire;

    //Init sur mardi à 12h06
    const result = _structureService.recupererProchaineOuverture(s, 2, 2, 1206);
    expect(result).toEqual({ jour: ' ', horaire: '14h00' });
  });

  it('Recuperer Prochaine Ouverture pour la semaine prochaine sur le même jour : should return an object ({Jour/Horaire})', () => {
    //Init structure avec deux horaires le mardi
    const s: Structure = new Structure();
    var horaire = [
      { openning: 805, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.mardi = new Jour();
    s.horaires.mercredi = new Jour();
    s.horaires.jeudi = new Jour();
    s.horaires.vendredi = new Jour();
    s.horaires.samedi = new Jour();
    s.horaires.dimanche = new Jour();
    s.horaires.mardi.open = true;
    s.horaires.mardi.time = horaire;

    //Init sur mardi à 15h15
    const result = _structureService.recupererProchaineOuverture(s, 2, 2, 1515);
    expect(result).toEqual({ jour: 'mardi', horaire: '8h05' });
  });

  it('Recuperer Prochaine Ouverture : should return an error string', () => {
    //Init structure avec aucun horaire
    const s: Structure = new Structure();
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.mardi = new Jour();
    s.horaires.mercredi = new Jour();
    s.horaires.jeudi = new Jour();
    s.horaires.vendredi = new Jour();
    s.horaires.samedi = new Jour();
    s.horaires.dimanche = new Jour();

    //Init sur jeudi à 12h06
    const result = _structureService.recupererProchaineOuverture(s, 4, 2, 1206);
    expect(result).toEqual('Aucun horaire disponible');
  });

  it('Mise à jour ouverture de la structure : should return true', () => {
    var horaire = [
      { openning: 805, closing: 1200 },
      { openning: 1400, closing: 1600 },
    ];
    //Init structure avec aucun horaire
    const s: Structure = new Structure();
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.mardi = new Jour();
    s.horaires.mercredi = new Jour();
    s.horaires.jeudi = new Jour();
    s.horaires.vendredi = new Jour();
    s.horaires.samedi = new Jour();
    s.horaires.dimanche = new Jour();

    s.horaires.jeudi.open = true;
    s.horaires.jeudi.time = horaire;

    //Init date sur un jeudi à 9h05
    var dt = new DateTime.local(2020, 10, 8, 9, 5);
    const result = _structureService.majOuvertureStructure(s, dt);
    expect(result.estOuvert).toEqual(true);
  });

  it('Mise à jour ouverture de la structure : should return false', () => {
    var horaire = [{ openning: 1400, closing: 1600 }];
    //Init structure avec aucun horaire
    const s: Structure = new Structure();
    s.horaires = new horaireStructure();
    s.horaires.lundi = new Jour();
    s.horaires.mardi = new Jour();
    s.horaires.mercredi = new Jour();
    s.horaires.jeudi = new Jour();
    s.horaires.vendredi = new Jour();
    s.horaires.samedi = new Jour();
    s.horaires.dimanche = new Jour();

    s.horaires.jeudi.open = true;
    s.horaires.jeudi.time = horaire;

    //Init date sur un jeudi à 9h05
    var dt = new DateTime.local(2020, 10, 8, 9, 5);
    const result = _structureService.majOuvertureStructure(s, dt);
    expect(result.estOuvert).toEqual(false);
  });
});
