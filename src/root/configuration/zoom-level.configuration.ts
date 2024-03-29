import { InjectionToken } from '@angular/core';

export type ZoomLevelConfiguration = {
  min: number;
  regular: number;
  userPosition: number;
  max: number;
};

export const ZOOM_LEVEL_TOKEN: InjectionToken<ZoomLevelConfiguration> = new InjectionToken<ZoomLevelConfiguration>(
  'brand.configuration'
);

export const ZOOM_LEVEL_CONFIGURATION: ZoomLevelConfiguration = {
  min: 3,
  regular: 5.5,
  userPosition: 13,
  max: 19
};
