import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrientationLayout } from '../layouts';
import { BesoinPage, DatePage, DemarrerPage, LocalisationPage, AccessibilitePage } from '../pages';

const ROUTES: Routes = [
  {
    children: [
      {
        component: BesoinPage,
        path: 'besoin',
        data: { animation: 'BesoinPage' }
      },
      {
        component: DatePage,
        path: 'date',
        data: { animation: 'DatePage' }
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
