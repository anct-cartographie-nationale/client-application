import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jour, Structure } from '../models/structure.model';
const { DateTime } = require('luxon');

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  constructor(private http: HttpClient) {}

  recupererStructures() {
    return this.http.get('/api/Structures');
  }

  majOuvertureStructure(structure: Structure) {
    //Récupère le jour de la semaine.
    var dt = DateTime.local();
    var jourSemaine: number = dt.weekday;

    //Vérifie si les minutes commencent par zéro pour éviter la suppression.
    var now: number;
    if (dt.minute.toString().length != 1) {
      now = parseInt('' + dt.hour + dt.minute, 10);
    } else {
      now = parseInt('' + dt.hour + 0 + dt.minute, 10);
    }

    //Récupérer les horaires d'une structure en fonction de son jour pour indiquer si elle est ouverte.
    var horaireStructure: Jour = this.recupererHoraire(structure, jourSemaine);
    structure.estOuvert = false;
    if (horaireStructure.open) {
      horaireStructure.time.forEach((periode) => {
        if (this.comparerHoraire(periode.openning, periode.closing, now)) {
          structure.estOuvert = true;
        }
      });
    }
    structure.ouvreLe = this.recupererProchaineOuverture(structure, jourSemaine, jourSemaine, now);
    return structure;
  }

  //Récupère les horaires d'une structure en fonction du jour de la semaine
  recupererHoraire(structure: Structure, jourActuel: number) {
    switch (jourActuel) {
      case 1:
        return structure.horaires.lundi;
      case 2:
        return structure.horaires.mardi;
      case 3:
        return structure.horaires.mercredi;
      case 4:
        return structure.horaires.jeudi;
      case 5:
        return structure.horaires.vendredi;
      case 6:
        return structure.horaires.samedi;
      case 7:
        return structure.horaires.dimanche;
      default:
        return null;
    }
  }
  //Vérifie si l'heure actuelle est dans l'interval des horaires de la structure
  comparerHoraire(heureDeb: number, heureFin: number, heureActuelle: number) {
    return heureActuelle >= heureDeb && heureActuelle <= heureFin;
  }

  recupererProchaineOuverture(s: Structure, j: number, baseJour: number, baseHeure: number) {
    //Récupérer horaire du jour en cours
    var horaires = this.recupererHoraire(s, j);
    //Condition pour stopper la récursion (Si le jour du compteur est égal au jour en cours)
    if (j + 1 != baseJour) {
      if (horaires.open) {
        //Vérifie si le compteur correspond au jour en cours pour éviter de proposer
        //les horaires déjà passés.
        if (j != baseJour) {
          var jourOuverture = null;
          horaires.time.every((periode) => {
            if (periode.openning) {
              jourOuverture = { jour: this.numberToDay(j), horaire: this.numberToHour(periode.openning) };
              return false;
            }
            return true;
          });
          //Si pas de période trouvée, on réitère.
          if (!jourOuverture) {
            return this.recupererProchaineOuverture(s, j + 1, baseJour, baseHeure);
          }
          return jourOuverture;
        } else {
          var jourOuverture = null;
          horaires.time.every((periode) => {
            if (periode.openning >= baseHeure) {
              jourOuverture = { jour: ' ', horaire: this.numberToHour(periode.openning) };
              return false;
            }
            return true;
          });
          //Si pas de période trouvée, on réitère.
          if (!jourOuverture) {
            return this.recupererProchaineOuverture(s, j + 1, baseJour, baseHeure);
          }
          return jourOuverture;
        }
      } else {
        //Si le jour est égal à Dimanche, on le positionne sur Lundi.
        if (j != 7) {
          return this.recupererProchaineOuverture(s, j + 1, baseJour, baseHeure);
        }
        return this.recupererProchaineOuverture(s, 1, baseJour, baseHeure);
      }
    }
    var lastChancehoraire = this.recupererHoraire(s, j + 1);
    var lastJour: any;
    if (lastChancehoraire.open) {
      lastChancehoraire.time.every((periode) => {
        if (periode.openning && periode.openning < baseHeure) {
          lastJour = { jour: this.numberToDay(j + 1), horaire: this.numberToHour(periode.openning) };
          return false;
        }
        lastJour = 'Aucun horaire disponible';
      });
    } else {
      lastJour = 'Aucun horaire disponible';
    }
    return lastJour;
  }

  numberToDay(n: number) {
    switch (n) {
      case 1:
        return 'lundi';
      case 2:
        return 'mardi';
      case 3:
        return 'mercredi';
      case 4:
        return 'jeudi';
      case 5:
        return 'vendredi';
      case 6:
        return 'samedi';
      case 7:
        return 'dimanche';
      default:
        return null;
    }
  }

  numberToHour(n: number) {
    if (n.toString().length == 3) {
      var tabNum = n.toString().match(/.{1,1}/g);
      return tabNum[0] + 'h' + tabNum[1] + tabNum[2];
    } else if (n.toString().length == 4) {
      var tabNum = n.toString().match(/.{1,2}/g);
      return tabNum[0] + 'h' + tabNum[1];
    }
  }
}
