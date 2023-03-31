import { Routes } from '@angular/router';
import { CoordinateurDetailsPage, CoordinateursListPage } from '../../pages';
import { CoordinateursLayout } from '../../layouts';

export const ROUTES: Routes = [
  {
    children: [
      {
        component: CoordinateurDetailsPage,
        path: ':id/details'
      },
      {
        component: CoordinateursListPage,
        path: ':id'
      },
      {
        component: CoordinateursListPage,
        path: ''
      }
    ],
    component: CoordinateursLayout,
    path: ''
  }
];
