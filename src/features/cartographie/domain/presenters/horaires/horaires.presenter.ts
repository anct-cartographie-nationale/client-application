import { HorairesPresentation, Jour } from './horaires.presentation';
import opening_hours from 'opening_hours';

const joursDeLaSemaine: Jour[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const invalidInterval = (interval: string | undefined) => interval != 'Fermé' && interval != null;

const dateWithoutTime = (date: Date) => date.toISOString().substring(0, 10);

const toIntervalString = (intervalStart: Date) =>
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
  [jour]: [timeTableOpeningHours[jour], `${toIntervalString(intervalStart)}-${toIntervalString(intervalEnd)}`]
    .filter(invalidInterval)
    .join(',')
});

const firstDayOfTheWeek = (date: Date): Date => new Date(date.setDate(date.getDate() - date.getDay() + 1));

const lastDayOfTheWeek = (date: Date) => new Date(date.setDate(date.getDate() - date.getDay() + joursDeLaSemaine.length + 1));

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
        ? new opening_hours(horairesOSM)
            .getOpenIntervals(
              new Date(dateWithoutTime(firstDayOfTheWeek(date))),
              new Date(dateWithoutTime(lastDayOfTheWeek(date)))
            )
            .reduce(
              (
                timeTableOpeningHours: HorairesPresentation,
                [intervalStart, intervalEnd]: [Date, Date, boolean, string | undefined]
              ): HorairesPresentation =>
                appendTimeTableInterval(
                  timeTableOpeningHours,
                  intervalStart,
                  intervalEnd,
                  joursDeLaSemaine[intervalStart.getDay() - 1]
                ),
              initialTimeTableOpeningHours
            )
        : undefined;
    } catch {
      return;
    }
  };

const MINUTES_IN_HOURS: number = 60;
const SECONDS_IN_MINUTE: number = 60;
const MILLISECONDS: number = 1000;
const HOUR_IN_MILLISECONDS = MINUTES_IN_HOURS * SECONDS_IN_MINUTE * MILLISECONDS;

type OpenStatus = 'Ouvert' | 'Ferme bientôt';

type CloseStatus = 'Fermé' | 'Ouvre bientôt';

export type OpeningStatus = OpenStatus | CloseStatus;

const nextHour = (now: Date): Date => new Date(now.getTime() + HOUR_IN_MILLISECONDS);

const openStatus = (willChange: boolean): OpenStatus => (willChange ? 'Ferme bientôt' : 'Ouvert');

const closedStatus = (willChange: boolean): CloseStatus => (willChange ? 'Ouvre bientôt' : 'Fermé');

const willChangeNextHour = (openingHours: opening_hours, date: Date): boolean =>
  openingHours.getNextChange(date, nextHour(date)) !== undefined;

const openingHoursState = (openingHours: opening_hours, date: Date): boolean => openingHours.getIterator(date).getState();

export const openingStatus =
  (date: Date) =>
  (horairesOSM?: string): OpeningStatus | undefined => {
    if (!horairesOSM) return;

    try {
      const openingHours = new opening_hours(horairesOSM);
      return openingHoursState(openingHours, date)
        ? openStatus(willChangeNextHour(openingHours, date))
        : closedStatus(willChangeNextHour(openingHours, date));
    } catch {
      return;
    }
  };

const dayOpenIntervals = (horairesOSM: string, dateWithoutTime: string) =>
  new opening_hours(horairesOSM).getOpenIntervals(
    new Date(`${dateWithoutTime}T00:00:00.000Z`),
    new Date(`${dateWithoutTime}T23:59:00.000Z`)
  );

export const isOpen =
  (date: Date) =>
  (horairesOSM: string, useTime: boolean): boolean => {
    try {
      return useTime
        ? new opening_hours(horairesOSM).getState(date)
        : dayOpenIntervals(horairesOSM, dateWithoutTime(date)).length > 0;
    } catch {
      return false;
    }
  };
