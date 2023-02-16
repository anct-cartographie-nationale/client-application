import { InjectionToken } from '@angular/core';

export type InitialPositionConfiguration = {
  latitude: number;
  longitude: number;
};

export const INITIAL_POSITION_TOKEN: InjectionToken<InitialPositionConfiguration> =
  new InjectionToken<InitialPositionConfiguration>('brand.configuration');

export const POSITION_CONFIGURATION: InitialPositionConfiguration = {
  latitude: 46.28146057911664,
  longitude: 4.468874066180609
};
