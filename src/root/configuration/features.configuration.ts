import { InjectionToken } from '@angular/core';
import { BrandConfiguration } from './brand.configuration';

export type AvailableFeatures = 'cartographie' | 'orientation';

export type ActivatedFeatureConfiguration<T extends boolean> = {
  active: T;
  url?: T extends true ? never : string;
};

export type FeatureConfiguration = ActivatedFeatureConfiguration<true> | ActivatedFeatureConfiguration<false>;

export type FeaturesConfiguration = Map<AvailableFeatures, FeatureConfiguration>;

export const FEATURES_TOKEN: InjectionToken<FeatureConfiguration> = new InjectionToken<FeatureConfiguration>(
  'features.configuration'
);

export const FEATURES_CONFIGURATION: FeaturesConfiguration = new Map<AvailableFeatures, FeatureConfiguration>([
  ['cartographie', { active: true }],
  ['orientation', { active: true }]
]);
