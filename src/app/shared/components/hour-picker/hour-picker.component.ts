import { Component, Input, Output, EventEmitter, OnDestroy, ViewChild, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Structure } from '../../../models/structure.model';
import { Time } from '../../../models/time.model';
import { Week } from '../../../models/week.model';

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.scss'],
})
export class HourPickerComponent implements OnChanges, OnDestroy {
  @Input() modifiedFields: any;
  // @Input() structure: any;

  @Output() updateHoursError = new EventEmitter<{ badHoursFormat: boolean }>();

  private copiedDay: any;
  public copiedDayName = '';
  public structure = {
    hours: [
      {
        name: 'Lundi',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
      {
        name: 'Mardi',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
      {
        name: 'Mercredi',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
      {
        name: 'Jeudi',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
      {
        name: 'Vendredi',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
      {
        name: 'Samedi',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
      {
        name: 'Dimanche',
        hours: [{ start: '', end: '', error: 'incomplete' }],
        open: false,
        active: false,
      },
    ],
  };
  public structureHoursDefault: any[] = [
    {
      name: 'Lundi',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
    {
      name: 'Mardi',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
    {
      name: 'Mercredi',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
    {
      name: 'Jeudi',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
    {
      name: 'Vendredi',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
    {
      name: 'Samedi',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
    {
      name: 'Dimanche',
      hours: [{ start: '', end: '', error: 'incomplete' }],
      open: false,
      active: false,
    },
  ];

  ngOnChanges(): void {
    this.formatHoursForEdition();
  }

  ngOnDestroy(): void {
    this.formatHoursForSave();
  }

  /**
   * Intégrer les horaires dans les horaires par défaut du composant
   */
  public formatHoursForEdition(): void {
    console.log('formatHoursForEdition');
    if (this.structure.hours) {
      for (const dayDefault of this.structureHoursDefault) {
        const foundDay = this.structure.hours.filter((day) => day.name === dayDefault.name);

        // if (foundDay.length && !foundDay[0].error) {
        if (foundDay.length) {
          foundDay[0].open = true;
        } else if (!foundDay.length) {
          this.structure.hours.push(dayDefault);
        }
      }
    } else {
      this.structure.hours = this.structureHoursDefault;
    }
  }

  /**
   * Formater les horaires pour l'enregistrement en base :
   * supprimer les données inutiles
   */
  public formatHoursForSave(): void {
    console.log('formatHoursForSave');
    if (!this.structure.hours) {
      return;
    }

    this.structure.hours = this.structure.hours.filter((day) => day.open === true);

    for (const day of this.structure.hours) {
      delete day.open;
      delete day.active;
      for (const hour of day.hours) {
        delete hour.error;
      }
    }
  }

  public activateDay(day: any): void {
    console.log('activateDay');
    // this.structure.hours.forEach((dayHours) => {
    //   dayHours.active = false;
    // });
    day.active = true;
  }

  public toggleOpenDay(day: any, value: any): void {
    day.open = value;
    if (!value) {
      day.hours = [{ start: '', end: '', error: 'incomplete' }];
    }

    this.checkHoursValid();
  }

  /**
   * Ajouter une ligne d'horaires à un jour
   */
  public addHours(day: any): void {
    if (day.hours.length >= 5) {
      return;
    }

    day.hours.push({
      start: '',
      end: '',
      type: 'withoutAppointment',
      error: 'incomplete',
    });

    this.checkHoursValid();
  }

  /**
   * Supprimer la dernière ligne d'horaires d'un jour
   */
  public removeHours(day: any, index: number): void {
    if (index > -1) {
      day.hours.splice(index, 1);
    }
  }

  /**
   * Copier les horaires d'un jour pour les coller par dessus les horaires d'un autre jour
   */
  public copy(day): void {
    console.log('copy', day);
    this.copiedDayName = day.name;
    this.copiedDay = day;
  }

  /**
   * Remplacer les horaires d'un jour par les horaires copiés précédemment
   */
  public paste(day): void {
    day.hours = JSON.parse(JSON.stringify(this.copiedDay.hours));
    day.open = this.copiedDay.open;
  }

  /**
   * Annuler la copie des horaires
   */
  public cancelCopy(): void {
    this.copiedDayName = '';
    this.copiedDay = null;
  }

  /**
   * Vérifier que le format des horaires est correct
   */
  public checkHoursValid(): void {
    let error = false;

    console.log('checkHoursValid');
    for (const day of this.structure.hours) {
      if (day.open) {
        for (const hour of day.hours) {
          if (hour.start === '' || hour.end === '') {
            hour.error = 'incomplete';
            error = true;
          } else if (hour.end <= hour.start) {
            hour.error = 'wrong';
            error = true;
          } else {
            hour.error = null;
          }
        }
      }
    }

    // Émettre l'erreur à ajouter au formulaire pour autoriser
    // ou empêcher de passer à l'étape suivante
    if (error) {
      this.updateHoursError.emit({ badHoursFormat: true });
    } else {
      this.updateHoursError.emit(null);
    }
  }
}
