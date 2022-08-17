import { Routes } from '@angular/router';
import { LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../../pages';
import { CartographieLayout } from '../../layouts';

export const ROUTES: Routes = [
  {
    children: [
      {
        component: LieuxMediationNumeriqueDetailsPage,
        path: ':id/details'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: ':id'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: ''
      }
    ],
    component: CartographieLayout,
    path: ''
  }
];
