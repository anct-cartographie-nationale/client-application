import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    loadChildren: async () => (await import('@features/cartographie')).CartographieFeatureModule,
    path: 'cartographie'
  },
  {
    loadChildren: async () => (await import('@features/orientation')).OrientationFeatureModule,
    path: 'orientation'
  }
];
