import { HorairesPresentation } from './horaires.presentation';
import opening_hours from 'opening_hours';

export const parseHoraires = (horairesOSM: string): HorairesPresentation => {
  const schedule: HorairesPresentation = {};
  const horairesRegEx = /\D+/;
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

export const gestionOuvertFerme = (horairesOSM?: string, now: Date = new Date()): string | undefined => {
  if (!horairesOSM) {
    return;
  }

  try {
    let currentStatus: string = '';
    let openingHours = new opening_hours(horairesOSM);
    const iterator = openingHours.getIterator(now);
    const is_open = iterator.getState();
    const futureDate = new Date(now.getTime() + 60 * 60 * 1000);
    const next_change = openingHours.getNextChange(now, futureDate);
    if (is_open && !next_change) currentStatus = 'Ouvert';
    else if (is_open && next_change) currentStatus = 'Ferme bientôt';
    else if (!is_open && !next_change) currentStatus = 'Fermé';
    else currentStatus = 'Ouvre bientôt';
    return currentStatus;
  } catch {
    return;
  }
};

const dayOpenIntervals = (horairesOSM: string, dateWithoutTime: string) =>
  new opening_hours(horairesOSM).getOpenIntervals(
    new Date(`${dateWithoutTime}T00:00:00.000Z`),
    new Date(`${dateWithoutTime}T23:59:00.000Z`)
  );

const dateWithoutTime = (date: Date) => date.toISOString().substring(0, 10);

export const isOpen = (date: Date) => {
  return (horairesOSM: string, useTime: boolean): boolean => {
    try {
      return useTime
        ? new opening_hours(horairesOSM).getState(date)
        : dayOpenIntervals(horairesOSM, dateWithoutTime(date)).length > 0;
    } catch {
      return false;
    }
  };
};
