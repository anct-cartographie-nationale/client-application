import { HorairesPresentation } from './horaires.presentation';
import opening_hours from 'opening_hours';

export const parseHoraires = (horairesOSM: string): HorairesPresentation => {
  const schedule: HorairesPresentation = {};
  const horairesRegEx = /[^0-9]+/;
  const replaceColonRegEx = /:/g;
  let openingHours = new opening_hours(horairesOSM);
  let horaires = openingHours.prettifyValue().split(';');
  horaires.forEach((sche: string) => {
    if (sche.includes('Mo')) {
      schedule['Lundi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('Tu')) {
      schedule['Mardi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('We')) {
      schedule['Mercredi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('Th')) {
      schedule['Jeudi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('Fr')) {
      schedule['Vendredi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('Sa')) {
      schedule['Samedi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('Su')) {
      schedule['Dimanche'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
  });
  return schedule;
};
