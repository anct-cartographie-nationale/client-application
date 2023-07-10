import { Routes } from '@angular/router';
import { DepartementsPage, LieuxMediationNumeriqueDetailsPage, LieuxMediationNumeriqueListPage } from '../../pages';
import { CartographieLayout } from '../../layouts';

export const ROUTES: Routes = [
  {
    children: [
      {
        component: LieuxMediationNumeriqueListPage,
        path: 'regions/:nomRegion/:nomDepartement'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: 'regions/:nomRegion/:nomDepartement/:id'
      },
      {
        component: DepartementsPage,
        path: 'regions/:nomRegion'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: 'regions'
      },
      {
        component: LieuxMediationNumeriqueListPage,
        path: 'departements/:nomDepartement'
      },
      {
        component: DepartementsPage,
        path: 'departements'
      },
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
