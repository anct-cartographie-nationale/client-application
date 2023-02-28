import { InjectionToken } from '@angular/core';

export type InitialPositionConfiguration = {
  latitude: number;
  longitude: number;
};

export const INITIAL_POSITION_TOKEN: InjectionToken<InitialPositionConfiguration> =
  new InjectionToken<InitialPositionConfiguration>('brand.configuration');

export const POSITION_CONFIGURATION: InitialPositionConfiguration = {
  latitude: 46.471,
  longitude: 2.455
};
