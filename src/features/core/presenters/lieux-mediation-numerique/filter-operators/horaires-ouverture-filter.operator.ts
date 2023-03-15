import { FilterOperator, FilterPresentation, OpeningHours } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';
import { isOpenNow, isOpenOn } from '../../horaires';
import { WeekDay } from '@angular/common';

const OSM_OPENING_HOURS_TRIVIAL_REGEXP =
  /^(?:(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:[-,](?:Mo|Tu|We|Th|Fr|Sa|Su))?\s)?(?:[0-1]\d|2[0-3]):[0-5]\d-(?:[0-1]\d|2[0-3]):[0-5]\d.*/;

const openingHoursDaysMap: Map<OpeningHours['day'], WeekDay> = new Map<OpeningHours['day'], WeekDay>([
  ['mo', WeekDay.Monday],
  ['tu', WeekDay.Tuesday],
  ['we', WeekDay.Wednesday],
  ['th', WeekDay.Thursday],
  ['fr', WeekDay.Friday],
  ['sa', WeekDay.Saturday],
  ['su', WeekDay.Sunday]
]);

const isOpenOnAllDays = (openingHours: OpeningHours): boolean => openingHours.day === 'all' && openingHours.period === 'hours';

const allDays = (): OpeningHours['day'][] => Array.from(openingHoursDaysMap.keys());

const toOpeningHoursForDay =
  (openingHours: OpeningHours) =>
  (day: OpeningHours['day']): OpeningHours => ({ ...openingHours, day });

const toAllDaysIfAny = (openingHours: OpeningHours): OpeningHours | OpeningHours[] =>
  isOpenOnAllDays(openingHours) ? allDays().map(toOpeningHoursForDay(openingHours)) : openingHours;

const isOsmOpeningHoursValid = (horaires: string | undefined): horaires is string =>
  horaires != null && OSM_OPENING_HOURS_TRIVIAL_REGEXP.test(horaires);

const isAnyDayAnyTime = (openingHours: OpeningHours[]) =>
  openingHours.find((openingHours: OpeningHours): boolean => openingHours.day === 'all' && openingHours.period === 'all');

const toIsOpenOn =
  (date: Date, horaires: string) =>
  (isOpen: boolean, openingHours: OpeningHours): boolean => {
    const weekDay: WeekDay | undefined = openingHoursDaysMap.get(openingHours.day);
    return (
      isOpen ||
      (openingHours?.start !== '' &&
        openingHours?.end !== '' &&
        weekDay != null &&
        isOpenOn(date)(horaires, weekDay, openingHours?.start, openingHours.end))
    );
  };

const hasNowOpen = (allOpeningHours: OpeningHours[]): boolean =>
  allOpeningHours.some((openingHours: OpeningHours) => openingHours.day === 'now');

const initialOpeningState = (date: Date, openingHours: OpeningHours[], horaires: string): boolean =>
  hasNowOpen(openingHours) ? isOpenNow(date)(horaires) : false;

const applyFilter = (date: Date, openingHours: OpeningHours[], horaires?: string): boolean => {
  if (!isOsmOpeningHoursValid(horaires)) return false;
  if (isAnyDayAnyTime(openingHours)) return true;

  return openingHours
    .map(toAllDaysIfAny)
    .flat()
    .reduce(toIsOpenOn(date, horaires), initialOpeningState(date, openingHours, horaires));
};

const shouldApply = (horaires_ouverture?: OpeningHours[]): horaires_ouverture is OpeningHours[] =>
  horaires_ouverture != null && horaires_ouverture.length > 0;

export const horairesOuvertureFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation,
  date: Date
): boolean =>
  shouldApply(filter.horaires_ouverture) ? applyFilter(date, filter.horaires_ouverture, lieuMediationNumerique.horaires) : true;
