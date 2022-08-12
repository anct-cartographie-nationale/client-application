import { Routes } from '@angular/router';
import { AccessibilitePage, BesoinPage, DemarrerPage, DisponibilitePage, LocalisationPage } from '../../pages';
import { OrientationLayout } from '../../layouts';

export const ROUTES: Routes = [
  {
    children: [
      {
        component: BesoinPage,
        path: 'besoin',
        data: { animation: 'BesoinPage' }
      },
      {
        component: DisponibilitePage,
        path: 'disponibilite',
        data: { animation: 'DisponibilitePage' }
      },
      {
        component: LocalisationPage,
        path: 'localisation',
        data: { animation: 'LocalisationPage' }
      },
      {
        component: AccessibilitePage,
        path: 'accessibilite',
        data: { animation: 'AccessibilitePage' }
      },
      {
        component: DemarrerPage,
        path: '',
        data: { animation: 'DemarrerPage' }
      }
    ],
    component: OrientationLayout,
    path: ''
  }
];
