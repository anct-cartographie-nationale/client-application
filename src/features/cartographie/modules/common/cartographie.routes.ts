import { Routes } from '@angular/router';
import {
  DepartementsPage,
  LieuxMediationNumeriqueDetailsPage,
  LieuxMediationNumeriqueListPage,
  RegionsPage
} from '../../pages';
import { CartographieLayout, ListHeaderLayout } from '../../layouts';

export const ROUTES: Routes = [
  {
    children: [
      {
        component: LieuxMediationNumeriqueDetailsPage,
        path: ':id/details'
      },
      {
        children: [
          {
            component: LieuxMediationNumeriqueListPage,
            path: 'regions/:nomRegion/:nomDepartement'
          },
          {
            component: DepartementsPage,
            path: 'regions/:nomRegion'
          },
          {
            component: RegionsPage,
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
            component: LieuxMediationNumeriqueListPage,
            path: ':id'
          },
          {
            component: LieuxMediationNumeriqueListPage,
            path: ''
          }
        ],
        component: ListHeaderLayout,
        path: ''
      }
    ],
    component: CartographieLayout,
    path: ''
  }
];