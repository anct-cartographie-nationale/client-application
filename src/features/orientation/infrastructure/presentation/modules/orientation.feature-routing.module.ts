import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrientationLayout } from '../layouts';
import { BesoinPage, DisponibilitePage, DemarrerPage, LocalisationPage, AccessibilitePage } from '../pages';

const ROUTES: Routes = [
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

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class OrientationFeatureRoutingModule {}
