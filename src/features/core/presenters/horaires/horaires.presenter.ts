import { WeekDay } from '@angular/common';
import opening_hours from 'opening_hours';
import { Time } from '../filter';
import { HorairesPresentation, Jour } from './horaires.presentation';

const joursDeLaSemaine: Jour[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const MINUTE_TO_MILLISECONDS: number = 60 * 1000;
const HOUR_TO_MILLISECONDS: number = 60 * MINUTE_TO_MILLISECONDS;
const DAY_TO_MILLISECONDS: number = 24 * HOUR_TO_MILLISECONDS;

export const dayOfTheWeek = (date: Date, weekDay: WeekDay): Date =>
  new Date(date.getTime() + ((weekDay === 0 ? 7 : weekDay) - date.getDay()) * DAY_TO_MILLISECONDS);

const timeToMilliseconds = (time: Time): number => {
  const [hours, minutes]: number[] = time.split(':').map(Number);
  return hours * HOUR_TO_MILLISECONDS + minutes * MINUTE_TO_MILLISECONDS;
};

const firstTimeOfTheDay = (date: Date): Date => {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
};

const lastTimeOfTheDay = (date: Date): Date => {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(23, 59, 59, 999);
  return dateWithoutTime;
};

export const dateTimeFor =
  (date: Date) =>
  (weekDay: WeekDay, time: Time): Date =>
    new Date(dayOfTheWeek(firstTimeOfTheDay(date), weekDay).getTime() + timeToMilliseconds(time));

const invalidInterval = (interval?: string) => interval != 'Fermé' && interval != null;

const formatTime = (intervalStart?: Date) =>
  intervalStart &&
  intervalStart
    .toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
    .replace(':', 'h');

const appendTimeTableInterval = (
  timeTableOpeningHours: HorairesPresentation,
  intervalStart: Date,
  intervalEnd: Date,
  jour: Jour
) => ({
  ...timeTableOpeningHours,
  [jour]: [timeTableOpeningHours[jour], `${formatTime(intervalStart)} - ${formatTime(intervalEnd)}`]
    .filter(invalidInterval)
    .join('\n')
});

export const firstDayOfTheWeek = (date: Date): Date => dayOfTheWeek(date, WeekDay.Monday);

export const lastDayOfTheWeek = (date: Date): Date => dayOfTheWeek(date, WeekDay.Sunday);

const initialTimeTableOpeningHours: HorairesPresentation = {
  Lundi: 'Fermé',
  Mardi: 'Fermé',
  Mercredi: 'Fermé',
  Jeudi: 'Fermé',
  Vendredi: 'Fermé',
  Samedi: 'Fermé',
  Dimanche: 'Fermé'
};

export const parseHoraires =
  (date: Date) =>
  (horairesOSM?: string): HorairesPresentation | undefined => {
    try {
      return horairesOSM
        ? new opening_hours(horairesOSM, null)
            .getOpenIntervals(firstTimeOfTheDay(firstDayOfTheWeek(date)), lastTimeOfTheDay(lastDayOfTheWeek(date)))
            .reduce(
              (
                timeTableOpeningHours: HorairesPresentation,
                [intervalStart, intervalEnd]: [Date, Date, boolean, string | undefined]
              ): HorairesPresentation =>
                appendTimeTableInterval(
                  timeTableOpeningHours,
                  intervalStart,
                  intervalEnd,
                  joursDeLaSemaine[intervalStart.getDay()]
                ),
              initialTimeTableOpeningHours
            )
        : undefined;
    } catch {
      return;
    }
  };

export type OpeningState = {
  label: 'Ouvert' | 'Fermé';
  limite: string;
};

const openingHoursState = (openingHours: opening_hours, date: Date): boolean => openingHours.getIterator(date).getState();

const nextOpeningDay = (openingHours: opening_hours, date: Date) =>
  ((nextChange?: Date): string =>
    date.toDateString() === nextChange?.toDateString()
      ? "aujourd'hui"
      : joursDeLaSemaine[nextChange?.getDay() ?? 0].toLowerCase())(openingHours.getNextChange(date));

const closeState = (openingHours: opening_hours, date: Date): OpeningState => ({
  label: 'Fermé',
  limite: `Ouvre ${nextOpeningDay(openingHours, date)} à ${formatTime(openingHours.getNextChange(date))}`
});

const openState = (openingHours: any, date: Date): OpeningState => ({
  label: 'Ouvert',
  limite: `Ferme à ${formatTime(openingHours.getNextChange(date))}`
});

export const openingState =
  (date: Date) =>
  (horairesOSM?: string): OpeningState | undefined => {
    if (!horairesOSM) return;

    try {
      const openingHours = new opening_hours(horairesOSM);
      return openingHoursState(openingHours, date) ? openState(openingHours, date) : closeState(openingHours, date);
    } catch {
      return;
    }
  };

export const isOpenNow =
  (date: Date) =>
  (horairesOSM: string): boolean => {
    try {
      return new opening_hours(horairesOSM).getState(date);
    } catch {
      return false;
    }
  };

export const isOpenOn =
  (date: Date) =>
  (horairesOSM: string, day: WeekDay, start: Time = '00:00', end: Time = '23:59'): boolean => {
    try {
      return (
        new opening_hours(horairesOSM).getOpenIntervals(dateTimeFor(date)(day, start), dateTimeFor(date)(day, end)).length > 0
      );
    } catch (e) {
      return false;
    }
  };

export const getIntervalWeekByOffset = (weekOffset: string | number): string => {
  const today = new Date();
  const startOfTheWeek = new Date(today);
  startOfTheWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfTheWeek.setDate(startOfTheWeek.getDate() + parseInt(weekOffset.toString()) * 7);
  const endOfTheWeek = new Date(startOfTheWeek);
  endOfTheWeek.setDate(startOfTheWeek.getDate() + 6);
  const year = today.getFullYear().toString().slice(-2);

  return `Du ${startOfTheWeek.toLocaleDateString().replace(/\/\d{4}/, `/${year}`)} au ${endOfTheWeek
    .toLocaleDateString()
    .replace(/\/\d{4}/, `/${year}`)}`;
};
