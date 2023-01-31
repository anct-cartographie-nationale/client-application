import { HorairesPresentation, Jour } from './horaires.presentation';
import opening_hours from 'opening_hours';

const joursDeLaSemaine: Jour[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

const invalidInterval = (interval: string | undefined) => interval != 'Fermé' && interval != null;

const dateWithoutTime = (date: Date) => date.toISOString().substring(0, 10);

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

const dayOfTheWeek = (date: Date, weekDay: number): number => new Date().setDate(date.getDate() - date.getDay() + weekDay + 1);

const firstDayOfTheWeek = (date: Date): Date => new Date(dayOfTheWeek(date, 0));

const lastDayOfTheWeek = (date: Date) => new Date(dayOfTheWeek(date, joursDeLaSemaine.length));

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
