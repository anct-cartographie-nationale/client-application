import { HorairesPresentation } from './horaires.presentation';

const opening_hours = require('opening_hours');

export const parseHoraires = (input_value: string): HorairesPresentation => {
  const schedule: { [day: string]: string } = {};
  console.log('input', input_value);
  const horairesRegEx = /[^0-9]+/;
  const replaceColonRegEx = /:/g;
  let openingHours = new opening_hours(input_value, {}, { locale: 'fr' });
  let horaires = openingHours.prettifyValue({ conf: { locale: 'fr' } }).split(';');
  horaires.forEach((sche: string) => {
    if (sche.includes('lun')) {
      schedule['Lundi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('mar')) {
      schedule['Mardi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('mer')) {
      schedule['Mercredi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('jeu')) {
      schedule['Jeudi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('ven')) {
      schedule['Vendredi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('sam')) {
      schedule['Samedi'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
    if (sche.includes('dim')) {
      schedule['Dimanche'] = sche.replace(horairesRegEx, '').replace(replaceColonRegEx, 'h');
    }
  });
  return schedule;
};
